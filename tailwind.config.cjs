const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#1B3C87',
				'whatsapp-green': '#25D366'
			},
			fontFamily: {
				sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};
