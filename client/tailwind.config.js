/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 60% - Dominant
                'fit-purple': '#4B0082', // Deep Indigo/Purple
                'fit-purple-dark': '#2E004F', // Darker shade for backgrounds/contrasts
                // 30% - Secondary (Neon)
                'fit-neon': '#39FF14', // Vibrant Neon Green
                // 10% - Accent
                'fit-gray': '#B0B0B0', // Silver/Gray
                'fit-charcoal': '#1A1A1A', // Dark text/bg alternative
            },
            fontFamily: {
                // You can add a specific font here later if needed
            }
        },
    },
    plugins: [],
}
