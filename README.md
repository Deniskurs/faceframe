# FaceFrame Beauty

A luxury beauty salon website for FaceFrame Beauty, London's premier destination for semi-permanent makeup, lash and brow treatments, and luxury facials. Founded by Iggy in 2018, FaceFrame Beauty combines European-trained artistry with precision techniques to enhance natural beauty.

## About FaceFrame Beauty

FaceFrame Beauty is a boutique beauty studio specializing in:

- **Semi-Permanent Makeup**: Microblading, ombré brows, combination brows
- **Lash & Brow Treatments**: Extensions, lifts, tinting, lamination
- **Luxury Facials**: Million Dollar Facial, dermaplaning, microneedling, hydrafacials
- **Professional Beauty Services**: Waxing, tinting, and bespoke beauty consultations

## Website Features

### Core Pages
- **Home**: Hero section, about strip, services preview, transformations gallery, client testimonials, and FAQs
- **About**: Comprehensive founder story, journey timeline, expertise credentials, studio experience, and core values
- **Gallery**: Curated before/after transformations and studio photography
- **FAQ**: Common questions with AI-powered Q&A assistant (powered by GPT-5 Nano)
- **Contact**: Location, hours, and booking information

### Design Philosophy

The website embodies **Chanel-inspired minimalism** with:
- Warm neutral palette (light-cream, soft-blush, elegant-mocha)
- Generous white space and hairline borders
- Alice (serif) and Alta (sans-serif) luxury typography
- Sophisticated animations with luxury easing curves
- Mobile-first, accessible design
- High-quality imagery with parallax effects

### Technical Features

- **AI-Powered FAQ**: Real-time question answering using OpenAI GPT-5 Nano with rate limiting
- **Dynamic Galleries**: Embla carousel with smooth transitions and lazy loading
- **Form Handling**: Integrated contact forms with validation
- **Responsive Design**: Mobile-first approach with seamless desktop scaling
- **Performance Optimized**: Static generation, image optimization, and code splitting
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## Tech Stack

### Framework & Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Components & Libraries
- **Embla Carousel** - Touch-friendly carousels
- **React Hook Form** - Form management
- **React Intersection Observer** - Viewport detection

### API & Services
- **OpenAI API** - AI-powered FAQ assistant (GPT-5 Nano)
- **Supabase** - Backend for testimonials and data storage

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── gallery/           # Gallery page
│   └── api/               # API routes (FAQ AI)
├── components/
│   ├── home/              # Home page components
│   ├── about/             # About page components
│   ├── faq/               # FAQ components (AI assistant)
│   ├── layout/            # Layout components (header, footer)
│   ├── shared/            # Shared components
│   └── ui/                # shadcn/ui components
├── data/                  # Static data (services, testimonials)
├── services/              # Service layer (API clients)
├── utils/                 # Utilities and animations
└── types/                 # TypeScript type definitions
```

## Development

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (for FAQ assistant)
- Supabase project (for testimonials)

### Environment Variables

Create a `.env.local` file:

```bash
# OpenAI API (for FAQ AI assistant)
OPENAI_API_KEY=your_openai_api_key

# Supabase (for testimonials)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Key Design Tokens

```css
/* Color Palette */
--light-cream: #FAF8F6
--soft-blush: #F5E6E0
--elegant-mocha: #4A4039
--muted-sand: #8B7F76
--deep-bronze: #3D342E

/* Typography */
font-family: 'Alice', serif          /* Elegant headings */
font-family: 'Alta', sans-serif      /* Clean body text */

/* Animations */
LUXURY_EASING: [0.19, 1, 0.22, 1]   /* Smooth luxury transitions */
```

## License

© 2018-2025 FaceFrame Beauty. All rights reserved.
