export const contact = {
  name: 'Muhammad Aswad Rustam',
  phone: '+92 318 040 2905',
  whatsapp: 'https://wa.me/923180402905?text=Hi%20Aswad%2C%20I%20want%20to%20work%20with%20you',
  email: 'aswadrustam11@gmail.com',
}

export const mailto = (subject = 'Project Inquiry', body = 'Hi Aswad, I want to work with you.') =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
