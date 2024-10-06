import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name wird benötigt.' })
    .min(2, { message: 'Muss mind. 2 Zeichen haben.' }),
  email: z
    .string()
    .min(1, { message: 'Email wird benötigt.' })
    .email('Ungültige Email.'),
  message: z.string().min(1, { message: 'Nachricht wird benötigt.' })
})

export const NewsletterFormSchema = z.object({
  email: z.string().email('Invalid email.')
})
