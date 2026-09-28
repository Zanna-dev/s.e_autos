import { prepareEnquiry } from '../utils/enquiry'
import type { Enquiry } from '../interfaces/enquiry'
// Local preparation only. No data is transmitted or stored by this service.
export const enquiryService = { async prepare(values: Enquiry) { return prepareEnquiry(values) } }
