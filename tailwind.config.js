/** @type {import('tailwindcss').Config} */


module.exports = {
    content: {
        files: [
            './index.html',
            './src/**/*.{vue,js,ts,jsx,tsx}',
            "./formkit.theme.ts"
        ],
    },
    theme: {
        extend: {},
    },

    plugins: [
    ],

}