// Studio content, carried over from the previous single-page build.
// Address, phone and social links are still placeholders (see docs/design-spec.md).
// Empty social links are hidden rather than rendered as dead links.

export interface Artist {
  slug: string
  name: string
  role: string
  tags: string[]
  bio: string
  portrait: string
  instagram: string
  tiktok: string
  portfolio: { src: string, alt: string }[]
  bookingService: 'tattoo' | 'piercing'
}

export const studio = {
  name: 'Boneshakers',
  address: '123 High Street, Your Town, AB1 2CD',
  phone: '01234 567 890',
  phoneHref: 'tel:+441234567890',
  hours: 'Mon–Sat 10am–6pm',
  hoursLong: [
    { days: 'Monday – Saturday', time: '10:00 – 18:00' },
    { days: 'Sunday', time: 'Closed' }
  ],
  instagram: '',
  facebook: ''
}

export const artists: Artist[] = [
  {
    slug: 'george',
    name: 'George',
    role: 'Tattoo artist',
    tags: ['Traditional', 'Neo-trad'],
    bio: 'Bold lines and vibrant colours. Specialising in classic American and Japanese-inspired work.',
    portrait: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?w=480&h=600&fit=crop',
    instagram: '',
    tiktok: '',
    portfolio: [],
    bookingService: 'tattoo'
  },
  {
    slug: 'ben',
    name: 'Ben',
    role: 'Tattoo artist',
    tags: ['Blackwork', 'Dotwork'],
    bio: 'Intricate geometric patterns and mandalas. Precision meets artistry.',
    portrait: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=480&h=600&fit=crop',
    instagram: '',
    tiktok: '',
    portfolio: [],
    bookingService: 'tattoo'
  },
  {
    slug: 'lee',
    name: 'Lee',
    role: 'Tattoo artist',
    tags: ['Realism', 'Portraits'],
    bio: 'Bringing photographs and memories to life on skin with stunning detail.',
    portrait: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=480&h=600&fit=crop',
    instagram: '',
    tiktok: '',
    portfolio: [],
    bookingService: 'tattoo'
  },
  {
    slug: 'lisa',
    name: 'Lisa',
    role: 'Lead piercer',
    tags: ['Piercing', 'Jewellery'],
    bio: 'Our experienced piercer, with years of expertise in all types of body piercing.',
    portrait: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=480&h=600&fit=crop&crop=face',
    instagram: '',
    tiktok: '',
    portfolio: [],
    bookingService: 'piercing'
  }
]

export const piercingPrices = [
  { name: 'Earlobe', price: 'From £25' },
  { name: 'Helix / Cartilage', price: 'From £30' },
  { name: 'Tragus / Conch', price: 'From £35' },
  { name: 'Daith / Rook', price: 'From £35' },
  { name: 'Industrial', price: 'From £45' },
  { name: 'Nostril', price: 'From £30' },
  { name: 'Septum', price: 'From £35' },
  { name: 'Lip / Labret', price: 'From £35' },
  { name: 'Tongue', price: 'From £40' },
  { name: 'Navel', price: 'From £35' },
  { name: 'Nipple (single)', price: 'From £40' }
]

export const piercingPromises = [
  'Implant-grade titanium jewellery only',
  'Single-use sterile equipment',
  'Aftercare guidance included',
  'Downsizing appointments included'
]

export const otherServices = [
  { title: 'Laser removal', description: 'Complete removal, or a fade to make room for cover-up work.' },
  { title: 'Cosmetic tattooing', description: 'Eyebrows, lip liner and beauty spots.' },
  { title: 'Art commissions', description: 'Custom artwork and prints from our artists, off the skin.' }
]

export const bookingSteps = [
  { title: 'Get in touch', body: 'Send us your idea, placement and rough size through the enquiry form, or ask for a specific artist.' },
  { title: 'Consultation', body: 'We talk through the design, price and timings with you, in the studio or by message.' },
  { title: 'Deposit', body: 'A deposit secures your booking. It is non-refundable, and comes off the final price.' },
  { title: 'The day', body: 'Fill in the consent form, eat a proper meal, and bring valid photo ID.' },
  { title: 'Aftercare', body: 'Your artist walks you through aftercare before you leave so it heals properly.' }
]

export const tattooFaqs = [
  {
    question: 'How should I prepare for my tattoo?',
    answer: "Get a good night's sleep, eat a proper meal beforehand, stay hydrated, and avoid alcohol for 24 hours before your appointment. Wear comfortable, loose clothing that gives easy access to the area being tattooed."
  },
  {
    question: 'What aftercare do you provide?',
    answer: 'We provide detailed aftercare instructions and recommend quality aftercare products. Your artist will walk you through everything you need to know so your tattoo heals properly.'
  },
  {
    question: 'Do you do cover-ups?',
    answer: 'Yes. Several of our artists specialise in cover-up work, and laser removal can lighten an existing tattoo before covering it. Book a consultation to talk through your options.'
  },
  {
    question: 'Do I need a deposit?',
    answer: 'Yes, a deposit secures your booking. It is non-refundable but comes off your final price. The amount depends on the size of the piece.'
  }
]

export const generalFaqs = [
  {
    question: 'How do I book an appointment?',
    answer: "Call us, message us, or fill in the enquiry form. We'll get back to you to talk through your idea and set up a consultation."
  },
  {
    question: 'What age do you need to be?',
    answer: 'You must be 18 or over to get a tattoo, with valid photo ID. For piercings, under-16s must be accompanied by a parent or guardian with matching ID.'
  }
]

export const shopCategories = [
  { name: 'Jewellery', description: 'Titanium body jewellery and upgrades' },
  { name: 'Clothing', description: 'Tees, hoodies and studio merch' },
  { name: 'Art', description: 'Original prints and flash' }
]

export const navItems = [
  { to: '/team', label: 'The Team' },
  { to: '/about', label: 'About' },
  { to: '/tattoos', label: 'Tattoos' },
  { to: '/piercings', label: 'Piercings' },
  { to: '/shop', label: 'Shop' }
]
