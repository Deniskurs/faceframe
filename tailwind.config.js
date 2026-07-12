/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'light-cream': '#EDE0D4',
  			'soft-blush': '#E6CCB2',
  			'warm-beige': '#DDB892',
  			'muted-sand': '#B08968',
  			'elegant-mocha': '#734D33',
  			'deep-bronze': '#89593C',
  			'silver-bronze': '#A8988B',
  			'rose-gold': '#C9A88A',
  			'luxe-gold': '#D4AF37',
  			'warm-taupe': '#8B7968',
  			'cool-mocha': '#6B5D52',
  			'deep-noir': '#2C2420',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			alice: [
  				'var(--font-alice)',
  				'serif'
  			],
  			alta: [
  				'var(--font-alta)',
  				'sans-serif'
  			]
  		},
  		letterSpacing: {
  			editorial: '0.15em',
  			refined: '0.2em',
  			luxury: '0.25em'
  		},
  		lineHeight: {
  			elegant: '1.618',
  			refined: '1.4'
  		},
  		borderWidth: {
  			hairline: '0.5px'
  		},
  		transitionTimingFunction: {
  			luxury: 'cubic-bezier(0.19, 1, 0.22, 1)',
			entrance: 'cubic-bezier(0.6, 0.05, 0.01, 0.9)',
			silk: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
  		},
  		keyframes: {
			'shimmer-sweep': { '0%': { transform: 'translateX(-120%)' }, '100%': { transform: 'translateX(120%)' } },
			'grain-drift': { '0%,100%': { transform: 'translate(0,0)' }, '25%': { transform: 'translate(-3%,2%)' }, '50%': { transform: 'translate(2%,-2%)' }, '75%': { transform: 'translate(-2%,-3%)' } },
			'ken-burns': { '0%': { transform: 'scale(1) translate(0,0)' }, '100%': { transform: 'scale(1.08) translate(1.5%,-1.5%)' } },
			'subtle-float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-100%)'
  				},
  				'100%': {
  					transform: 'translateY(100%)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
			'shimmer-sweep': 'shimmer-sweep 1.1s cubic-bezier(0.19,1,0.22,1)',
			'grain-drift': 'grain-drift 8s steps(4) infinite',
			'ken-burns': 'ken-burns 12s cubic-bezier(0.19,1,0.22,1) infinite alternate',
			'subtle-float': 'subtle-float 4s cubic-bezier(0.19,1,0.22,1) infinite',
  			'slide-down': 'slideDown 1.5s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
			'luxury-sm': '0 2px 8px -2px rgba(115,77,51,0.08)',
			luxury: '0 8px 30px -8px rgba(115,77,51,0.12)',
			'luxury-lg': '0 20px 50px -12px rgba(115,77,51,0.18)',
			'luxury-glow': '0 0 0 1px rgba(212,175,55,0.15), 0 12px 40px -10px rgba(115,77,51,0.2)',
  			input: '0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
