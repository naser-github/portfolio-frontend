module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",

    // toaster
    'node_modules/tv-*/dist/tv-*.umd.min.js',
  ],
  theme: {
    // override the actual css
    colors: {
      // Configure your color palette here
      "daraz": '#F85606',
      "daraz-dark": '#FF4400',
      "light-blue": '#C2FFFA',
      "dark-blue": '#3F0686',
    },

    // does n't override the actual css
    extend: {
      backgroundImage: {
        'daraz-logo': "url('assets/image/daraz.svg')",
      },

    },
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: ["emerald"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
