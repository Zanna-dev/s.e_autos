import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'

// Transpile these pure TypeScript modules using the project's existing compiler.
// No browser, network or extra test dependencies are needed.
async function moduleUrl(relative) {
  const file = path.resolve(relative)
  let code = ts.transpileModule(await fs.readFile(file, 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext },
  }).outputText
  for (const match of [...code.matchAll(/from ['"](\.[^'"]+)['"]/g)]) {
    const dependency = await moduleUrl(path.resolve(path.dirname(file), `${match[1]}.ts`))
    code = code.replace(match[0], `from '${dependency}'`)
  }
  return `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
}
const { validateEnquiry, prepareEnquiry, enquiryLinks } = await import(await moduleUrl('src/utils/enquiry.ts'))
const { filterVehicles, formatPrice } = await import(await moduleUrl('src/utils/vehicles.ts'))
const { mockVehicles } = await import(await moduleUrl('src/data/vehicles.mock.ts'))
const valid = { name: '  Demo Visitor  ', email: 'visitor@example.com', businessType: 'Individual / personal purchase', projectType: 'Foreign Used', message: 'I need a sedan for daily travel & weekend trips.' }

test('rejects blank fields, malformed email and an unsupported enquiry type', () => {
  const errors = validateEnquiry({ name: ' ', email: 'invalid@', businessType: '', projectType: 'Unexpected', message: 'short' })
  assert.deepEqual(Object.keys(errors).sort(), ['businessType', 'email', 'message', 'name', 'projectType'])
  assert.deepEqual(validateEnquiry(valid), {})
})
test('prepares a message with exact destination and safely encoded special characters', () => {
  const message = prepareEnquiry(valid)
  assert.ok(message.includes('Name: Demo Visitor\n'))
  assert.ok(message.includes(valid.message))
  const links = enquiryLinks(message)
  const whatsapp = new URL(links.whatsapp)
  assert.equal(whatsapp.origin, 'https://wa.me')
  assert.equal(whatsapp.pathname, '/2348138883296')
  assert.equal(whatsapp.searchParams.get('text'), message)
  assert.ok(links.email.startsWith('mailto:doubleseautos@gmail.com?'))
  assert.equal(new URLSearchParams(links.email.split('?')[1]).get('body'), message)
})
test('search combines category and condition instead of overriding either', () => {
  assert.equal(filterVehicles(mockVehicles, '  LEXUS ', 'Sedan', 'Foreign Used').length, 1)
  assert.equal(filterVehicles(mockVehicles, 'lexus', 'SUV', 'All').length, 0)
  assert.equal(filterVehicles(mockVehicles, '', 'Sedan', 'Nigerian Used Car')[0].make, 'BMW')
  assert.equal(filterVehicles(mockVehicles, 'nonexistent', 'All', 'All').length, 0)
  assert.equal(filterVehicles(mockVehicles, '', 'All', 'All').length, 4)
})
test('currency displays use fixed illustrative conversion and preserve canonical prices', () => {
  const price = mockVehicles[0].priceNGN
  assert.match(formatPrice(1600000, 'USD'), /1,000/)
  assert.match(formatPrice(1750000, 'EUR'), /1,000/)
  assert.match(formatPrice(1600000, 'NGN'), /1,600,000/)
  assert.equal(mockVehicles[0].priceNGN, price)
})
test('every gallery has a unique vehicle identity and readable local image assets', async () => {
  assert.equal(new Set(mockVehicles.map(vehicle => vehicle.id)).size, mockVehicles.length)
  for (const vehicle of mockVehicles) {
    for (const image of vehicle.images) {
      assert.ok(image.alt.length > 10)
      await fs.access(path.join('public', image.src))
      await fs.access(path.join('public', image.small))
    }
  }
})
