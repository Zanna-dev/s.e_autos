import { createContext, useContext } from 'react'
export const ContactContext = createContext<(interest?: string) => void>(() => {})
export function useContact() { return useContext(ContactContext) }
