import { projectTypes, type Enquiry, type EnquiryErrors } from '../interfaces/enquiry'
export function validateEnquiry(values: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.businessType) errors.businessType = 'Choose who you are enquiring for.'
  if (!(projectTypes as readonly string[]).includes(values.projectType)) errors.projectType = 'Choose an enquiry type.'
  if (values.message.trim().length < 15) errors.message = 'Tell us a little more (at least 15 characters).'
  return errors
}
export function prepareEnquiry(values: Enquiry) {
  return `Hello DOUBLE S.E AUTOS,\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nBusiness type: ${values.businessType}\nEnquiry: ${values.projectType}\n\n${values.message.trim()}`
}
export function enquiryLinks(message: string) {
  return { whatsapp: `https://wa.me/2348138883296?text=${encodeURIComponent(message)}`, email: `mailto:doubleseautos@gmail.com?subject=${encodeURIComponent('Vehicle enquiry — DOUBLE S.E AUTOS')}&body=${encodeURIComponent(message)}` }
}
