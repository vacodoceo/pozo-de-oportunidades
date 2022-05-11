module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#1B3C87',
				'whatsapp-green': '#25D366'
			}
		}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};
