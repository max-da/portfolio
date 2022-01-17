module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center:true,
   
    },
  
    extend:{
      fontFamily:{
        "roboto":["Roboto"],
        "sans":["Roboto"]
      },
      colors:{
       "bgWhite": "#FFFCF2",
       "aside":"#A57F60",
       "purple":"#290043"
      }
    }
  },
  plugins: [],
}
