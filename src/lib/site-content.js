export const NAV_LINKS = [
  {
    label: "Men",
    to: "/shop",
    search: { gender: "men" },
    panel: {
      columns: [
        {
          title: "Shop Men",
          links: [
            {
              label: "All Men's Watches",
              to: "/shop",
              search: { gender: "men" },
            },
            {
              label: "Chronograph",
              to: "/shop",
              search: { gender: "men", collection: "chronograph" },
            },
            {
              label: "Automatic",
              to: "/shop",
              search: { gender: "men", collection: "automatic" },
            },
            {
              label: "Dive",
              to: "/shop",
              search: { gender: "men", collection: "diver" },
            },
          ],
        },
        {
          title: "By Strap",
          links: [
            {
              label: "Leather",
              to: "/shop",
              search: { gender: "men", style: "leather" },
            },
            {
              label: "Stainless Steel",
              to: "/shop",
              search: { gender: "men", style: "steel" },
            },
            {
              label: "Gold",
              to: "/shop",
              search: { gender: "men", style: "gold" },
            },
            {
              label: "Minimal",
              to: "/shop",
              search: { gender: "men", style: "minimal" },
            },
          ],
        },
      ],
      feature: {
        title: "Meridian Chronograph",
        copy: "Our signature steel chronograph.",
        slug: "meridian-chronograph",
      },
    },
  },
  {
    label: "Women",
    to: "/shop",
    search: { gender: "women" },
    panel: {
      columns: [
        {
          title: "Shop Women",
          links: [
            {
              label: "All Women's Watches",
              to: "/shop",
              search: { gender: "women" },
            },
            {
              label: "Gold",
              to: "/shop",
              search: { gender: "women", style: "gold" },
            },
            {
              label: "Leather",
              to: "/shop",
              search: { gender: "women", style: "leather" },
            },
            {
              label: "Minimal",
              to: "/shop",
              search: { gender: "women", style: "minimal" },
            },
          ],
        },
        {
          title: "Collections",
          links: [
            { label: "Aurelia", to: "/product/aurelia" },
            { label: "Solstice Gold", to: "/product/solstice-gold" },
            { label: "Lune Slim", to: "/product/lune-slim" },
            {
              label: "Under ₹25,000",
              to: "/shop",
              search: { gender: "women", price: "under-25000" },
            },
          ],
        },
      ],
      feature: {
        title: "Aurelia",
        copy: "Mother-of-pearl and gold mesh.",
        slug: "aurelia",
      },
    },
  },
  {
    label: "Collections",
    to: "/collections",
    panel: {
      columns: [
        {
          title: "Shop by Collection",
          links: [
            {
              label: "Chronograph",
              to: "/shop",
              search: { collection: "chronograph" },
            },
            {
              label: "Classic",
              to: "/shop",
              search: { collection: "classic" },
            },
            {
              label: "Automatic",
              to: "/shop",
              search: { collection: "automatic" },
            },
            { label: "Dive", to: "/shop", search: { collection: "diver" } },
          ],
        },
        {
          title: "Shop by Style",
          links: [
            {
              label: "Leather Strap",
              to: "/shop",
              search: { style: "leather" },
            },
            {
              label: "Stainless Steel",
              to: "/shop",
              search: { style: "steel" },
            },
            {
              label: "Gold Collection",
              to: "/shop",
              search: { style: "gold" },
            },
            { label: "Minimal", to: "/shop", search: { style: "minimal" } },
          ],
        },
      ],
      feature: {
        title: "Vantage Skeleton",
        copy: "The movement is the dial.",
        slug: "vantage-skeleton",
      },
    },
  },
  { label: "New Arrivals", to: "/shop", search: { new: "true" } },
  { label: "Sale", to: "/shop", search: { sale: "true" } },
];

export const REVIEWS = [
  {
    name: "Ananya R.",
    city: "Mumbai",
    watch: "Aurelia",
    quote:
      "The mother-of-pearl dial is far more beautiful in person. Packaging alone felt like a gift I was giving myself.",
  },
  {
    name: "Rohan M.",
    city: "Bengaluru",
    watch: "Meridian Chronograph",
    quote:
      "Wears like a much more expensive watch. The leather strap softened in a week and the chrono pushers are crisp.",
  },
  {
    name: "Kabir S.",
    city: "New Delhi",
    watch: "Vantage Skeleton",
    quote:
      "I've owned watches at four times the price with half the finishing. The skeleton dial gets comments every meeting.",
  },
  {
    name: "Meera J.",
    city: "Hyderabad",
    watch: "Solstice Gold",
    quote:
      "Perfect 34mm size for my wrist. It dresses up a plain shirt instantly without looking like jewellery.",
  },
  {
    name: "Aditya V.",
    city: "Pune",
    watch: "Regatta Diver",
    quote:
      "Swam with it in Goa, came home, wore it to dinner. The mesh bracelet is genuinely comfortable.",
  },
  {
    name: "Sara N.",
    city: "Kolkata",
    watch: "Lune Slim",
    quote:
      "So thin I forget I'm wearing it. The blush strap is exactly the shade in the photos.",
  },
];

export const TRUST_POINTS = [
  { title: "Free Insured Delivery", copy: "Across India, 2–4 days" },
  { title: "3-Year Warranty", copy: "Movement covered" },
  { title: "14-Day Returns", copy: "No questions asked" },
  { title: "Secure Checkout", copy: "Encrypted end to end" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Men's Watches", to: "/shop", search: { gender: "men" } },
      { label: "Women's Watches", to: "/shop", search: { gender: "women" } },
      {
        label: "Chronograph",
        to: "/shop",
        search: { collection: "chronograph" },
      },
      {
        label: "Classic Watches",
        to: "/shop",
        search: { collection: "classic" },
      },
      { label: "New Arrivals", to: "/shop", search: { new: "true" } },
      { label: "Sale", to: "/shop", search: { sale: "true" } },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Contact Us", to: "/info/contact" },
      { label: "Shipping & Delivery", to: "/info/shipping" },
      { label: "Returns & Exchanges", to: "/info/returns" },
      { label: "Warranty & Service", to: "/info/warranty" },
      { label: "Watch Care", to: "/info/care" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "About AURAVEN", to: "/info/about" },
      { label: "Collections", to: "/collections" },
      { label: "Privacy Policy", to: "/info/privacy" },
      { label: "Terms of Service", to: "/info/terms" },
    ],
  },
];

export const INFO_PAGES = {
  contact: {
    title: "Contact Us",
    eyebrow: "Client Care",
    intro: "Our team replies within one business day, Monday to Saturday.",
    sections: [
      {
        heading: "Write to us",
        body: "For order questions, sizing advice or service requests, email clients@auraven.in and include your order number if you have one.",
      },
      {
        heading: "Call us",
        body: "Client care is available on +91 22 4000 1962, Monday to Saturday, 10:00–19:00 IST.",
      },
      {
        heading: "Visit",
        body: "AURAVEN Studio, 3rd Floor, Kala Ghoda, Fort, Mumbai 400001. By appointment only.",
      },
    ],
  },
  shipping: {
    title: "Shipping & Delivery",
    eyebrow: "Client Care",
    intro: "Every AURAVEN watch ships insured, in signature packaging.",
    sections: [
      {
        heading: "Within India",
        body: "Complimentary insured delivery on all orders. Metro cities arrive in 2–3 business days, other pin codes in 3–5. Every parcel is signature-required.",
      },
      {
        heading: "International",
        body: "We ship to 34 countries via express courier. Duties and taxes are calculated at checkout and paid in advance.",
      },
      {
        heading: "Tracking",
        body: "A tracking link is emailed the moment your watch leaves our Mumbai studio.",
      },
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    eyebrow: "Client Care",
    intro: "Fourteen days to decide, in the condition it arrived.",
    sections: [
      {
        heading: "The window",
        body: "Return or exchange any unworn watch within 14 days of delivery. Straps must be unworn, case stickers intact and all packaging included.",
      },
      {
        heading: "How to start",
        body: "Email clients@auraven.in with your order number. We arrange a free pickup and refund to the original payment method within 5 business days of inspection.",
      },
      {
        heading: "Exclusions",
        body: "Engraved casebacks and watches sized to your wrist cannot be returned unless faulty.",
      },
    ],
  },
  warranty: {
    title: "Warranty & Service",
    eyebrow: "Client Care",
    intro: "Three years on the movement, for as long as you own it.",
    sections: [
      {
        heading: "What is covered",
        body: "Every AURAVEN movement is covered for three years against manufacturing defects. Battery replacement and gasket service are complimentary for the first three years.",
      },
      {
        heading: "What is not",
        body: "Normal wear on straps, glass scratches, water damage from an opened case, and damage from accident or misuse.",
      },
      {
        heading: "Servicing",
        body: "Book a service by email. We collect, service and return your watch within 14 working days, insured both ways.",
      },
    ],
  },
  care: {
    title: "Watch Care",
    eyebrow: "Client Care",
    intro: "A mechanical object rewards a little attention.",
    sections: [
      {
        heading: "Leather",
        body: "Keep leather straps away from water and prolonged sunlight. Condition twice a year with a neutral leather balm. Rotate straps to extend their life.",
      },
      {
        heading: "Steel & gold",
        body: "Rinse a steel bracelet with lukewarm water and a soft brush. Gold plating should be wiped with a dry microfibre cloth, never polished with abrasives.",
      },
      {
        heading: "Automatic movements",
        body: "If unworn for more than two weeks, wind the crown 30 turns before setting the time. Store away from magnets and speakers.",
      },
    ],
  },
  about: {
    title: "About AURAVEN",
    eyebrow: "The House",
    intro: "A Mumbai watch house making considered objects at an honest price.",
    sections: [
      {
        heading: "The idea",
        body: "Most premium watches are priced for a logo. AURAVEN was founded in 2019 to price for the object: Swiss movements, sapphire crystal, 316L steel, and finishing usually reserved for watches several times the cost.",
      },
      {
        heading: "How we design",
        body: "Every reference begins as a drawing, then a resin model worn for six weeks before anything is made. If a proportion feels off on the wrist, it never reaches production.",
      },
      {
        heading: "Where it is made",
        body: "Movements from Switzerland, cases from a family workshop in Shenzhen, and final assembly, regulation and quality control in Mumbai.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Policies",
    intro: "We collect the minimum needed to sell and service a watch.",
    sections: [
      {
        heading: "What we collect",
        body: "Name, delivery address, email and phone number for order fulfilment, plus anonymised browsing analytics. We never store card numbers — payments are handled by our payment provider.",
      },
      {
        heading: "How it is used",
        body: "To fulfil orders, arrange delivery and service, and — only if you opt in — to send occasional collection announcements. You can unsubscribe from any email.",
      },
      {
        heading: "Your rights",
        body: "Write to privacy@auraven.in to request a copy of your data or its deletion. We respond within 30 days.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    eyebrow: "Policies",
    intro: "The terms that apply when you buy from AURAVEN.",
    sections: [
      {
        heading: "Orders",
        body: "An order is accepted when we confirm dispatch. We may cancel an order for pricing errors, stock unavailability or suspected fraud, and will refund in full.",
      },
      {
        heading: "Pricing",
        body: "All prices are in Indian Rupees and include GST. International duties are shown at checkout.",
      },
      {
        heading: "Liability",
        body: "Our liability is limited to the value of the watch purchased. Nothing here limits rights you have under the Consumer Protection Act, 2019.",
      },
    ],
  },
};
