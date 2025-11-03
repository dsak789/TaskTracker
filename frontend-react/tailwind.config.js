module.exports = {
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(-50%) translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(-50%) translateY(0)",
            opacity: "1",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateX(-50%) translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-50%) translateY(100%)",
            opacity: "0",
          },
        },
        animation: {
          "slide-in": "slideIn 2.5s ease-in-out forwards",
          "slide-out": "slideOut 2.5s ease-in-out forwards",
        },
      },
    },
    plugins: [],
  },
};
