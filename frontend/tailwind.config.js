import flowbiteplugin from 'flowbite/plugin';

export default({
  content: [   
      "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../frontend/node_modules/flowbite/dist/flowbite.js"],
  theme: {
    extend: {},
  },
  plugins: [
    flowbiteplugin
  ],
});
