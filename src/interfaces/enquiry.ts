export interface Enquiry {
  name: string;
  email: string;
  businessType: string;
  projectType: string;
  message: string;
}
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export const projectTypes = [
  "Nigerian Used Car",
  "Foreign Used",
  "Brand New",
  "Swap",
  "After-purchase maintenance",
  "Car hire",
  "Other",
] as const;
