/** @type {import('tailwindcss').Config} */
import { tailwindcssOriginSafelist } from '@headlessui-float/vue'
import containerQueries from '@tailwindcss/container-queries'

export default {
	content: ['./index.html', './src/**/*.{vue,ts}'],
	safelist: tailwindcssOriginSafelist.slice(),
	theme: {
		extend: {
			gridTemplateColumns: {
				'auth-layout': '1fr 1.75fr',
			},

			fontFamily: {
				sans: ['DM Sans', 'sans-serif'],
				mono: ['DM Mono'],
			},

			fontSize: {
				hero: [
					'var(--font-size-hero)',
					{
						lineHeight: 'var(--font-line-height-hero)',
					},
				],
				title: [
					'var(--font-size-title)',
					{
						lineHeight: 'var(--font-line-height-title)',
					},
				],
				subtitle: [
					'var(--font-size-subtitle)',
					{
						lineHeight: 'var(--font-line-height-subtitle)',
					},
				],
				heading: [
					'var(--font-size-heading)',
					{
						lineHeight: 'var(--font-line-height-heading)',
					},
				],
				body: [
					'var(--font-size-body)',
					{
						lineHeight: 'var(--font-line-height-body)',
					},
				],
				subtext: [
					'var(--font-size-subtext)',
					{
						lineHeight: 'var(--font-line-height-subtext)',
					},
				],
				caption: [
					'var(--font-size-caption)',
					{
						lineHeight: 'var(--font-line-height-caption)',
					},
				],
			},

			boxShadow: {
				'DEFAULT': 'var(--shadow)',
				'sm': 'var(--shadow-sm)',
				'card-shadow': 'var(--shadow-card);',
				'card-hover-shadow': 'var(--shadow-card-hover);',
				'button-shadow': 'var(--shadow-button);',
				'button-hover-shadow': 'var(--shadow-button-hover);',
				'popover-shadow': 'var(--shadow-popover);',
				'modal-shadow': 'var(--shadow-modal);',
				'table-header': '0px 2px 3px 0px #1018281A',
				'table-shadow': '0px 1px 2px 0px #1018280F',
				'input-shadow': '0px 1px 2px 0px #1018280D',
				'jobs-table-header-shadow': '0px 1px 2px 0px #1018280F, 0px 2px 3px 0px #1018281A',
			},

			borderRadius: {
				card: 'var(--radius-card)',
				button: 'var(--radius-button)',
				input: 'var(--radius-input)',
				modal: 'var(--radius-modal)',
				popover: 'var(--radius-popover)',
				full: 'var(--radius-full)',
			},

			colors: {
				transparent: 'transparent',
				black: 'rgba(var(--black), <alpha-value>)',
				white: 'rgba(var(--white), <alpha-value>)',

				border: 'rgba(var(--border), <alpha-value>)',
				ring: 'rgba(var(--ring), <alpha-value>)',

				background: 'rgba(var(--background), <alpha-value>)',
				foreground: 'rgba(var(--foreground), <alpha-value>)',

				primary: {
					DEFAULT: 'rgba(var(--primary), <alpha-value>)',
					foreground: 'rgba(var(--primary-foreground), <alpha-value>)',
				},
				secondary: {
					DEFAULT: 'rgba(var(--secondary), <alpha-value>)',
					foreground: 'rgba(var(--secondary-foreground), <alpha-value>)',
				},
				destructive: {
					DEFAULT: 'rgba(var(--destructive), <alpha-value>)',
					foreground: 'rgba(var(--destructive-foreground), <alpha-value>)',
				},
				muted: {
					DEFAULT: 'rgba(var(--muted), <alpha-value>)',
					foreground: 'rgba(var(--muted-foreground), <alpha-value>)',
					background: 'rgba(var(--muted-background), <alpha-value>)',
				},
				accent: {
					DEFAULT: 'rgba(var(--accent), <alpha-value>)',
					foreground: 'rgba(var(--accent-foreground), <alpha-value>)',
				},
				warning: {
					DEFAULT: 'rgba(var(--warning), <alpha-value>)',
					foreground: 'rgba(var(--warning-foreground), <alpha-value>)',
				},
				success: {
					DEFAULT: 'rgba(var(--success), <alpha-value>)',
					foreground: 'rgba(var(--success-foreground), <alpha-value>)',
				},
				popover: {
					DEFAULT: 'rgba(var(--popover), <alpha-value>)',
					foreground: 'rgba(var(--popover-foreground), <alpha-value>)',
				},
				card: {
					DEFAULT: 'rgba(var(--card), <alpha-value>)',
					foreground: 'rgba(var(--card-foreground), <alpha-value>)',
				},

				input: {
					DEFAULT: 'rgba(var(--input), <alpha-value>)',
					foreground: 'rgba(var(--input-foreground), <alpha-value>)',
					placeholder: 'rgba(var(--input-placeholder), <alpha-value>)',
					disabled: 'rgba(var(--input-disabled), <alpha-value>)',
					border: 'rgba(var(--input-border), <alpha-value>)',
					ring: 'rgba(var(--input-ring), <alpha-value>)',
				},

				neutral: {
					900: 'rgba(var(--neutral-900), <alpha-value>)',
					800: 'rgba(var(--neutral-800), <alpha-value>)',
					700: 'rgba(var(--neutral-700), <alpha-value>)',
					600: 'rgba(var(--neutral-600), <alpha-value>)',
					500: 'rgba(var(--neutral-500), <alpha-value>)',
					400: 'rgba(var(--neutral-400), <alpha-value>)',
					300: 'rgba(var(--neutral-300), <alpha-value>)',
					200: 'rgba(var(--neutral-200), <alpha-value>)',
					100: 'rgba(var(--neutral-100), <alpha-value>)',
				},
			},

			width: {
				modal: '28rem',
			},

			maxWidth: {
				container: '70rem',
			},

			keyframes: {
				toFullWidth: {
					'0%': { width: '0%' },
					'100%': { width: '100%' },
				},
			},

			animation: {
				'to-full-width': 'toFullWidth 5s linear',
			},

			transitionTimingFunction: {
				'modal': 'cubic-bezier(0.22, 0.68, 0, 1.51)',
				'modal-overlay': 'cubic-bezier(0.17, 0.67, 0.16, 0.99)',
			},
		},
	},
	plugins: [containerQueries],
}
