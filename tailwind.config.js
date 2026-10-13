/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["././src/**/*.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F6F2",
        surface: "#FFFFFF",
        border: "#E7E5E0",
        primary: "#38452F",
        "primary-container": "#4F5D45",
        "on-primary": "#FFFFFF",
        "on-surface": "#1C1B1B",
        secondary: "#5E5E5E",
        error: "#B91C1C",
        "surface-container":"#f0eded",
        placeholder: "#A3A3A3",
        "surface-container-low": "#F6F3F2",
        "surface-container-highest": "#E5E2E1",
      },
      spacing: { margin: "24px" },
      fontFamily: {
        jakarta: ["PlusJakartaSans_400Regular"],
        "jakarta-medium": ["PlusJakartaSans_500Medium"],
        "jakarta-semibold": ["PlusJakartaSans_600SemiBold"],
      },
      fontSize: {
        "headline-lg": ["30px", { lineHeight: "38px", letterSpacing: "-0.6px" }],
        "title-brand": ["18px", { lineHeight: "24px", letterSpacing: "-0.18px" }],
        "body-lg": ["16px", { lineHeight: "24px" }],
        "body-md": ["15px", { lineHeight: "22px" }],
        "body-sm": ["14px", { lineHeight: "20px" }],
        "label-lg": ["16px", { lineHeight: "22px" }],
        "label-md": ["14px", { lineHeight: "20px" }],
        "label-sm": ["13px", { lineHeight: "18px" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "-0.2px" }],
        caption: ["12px", { lineHeight: "16px" }],
      },
    },
  },
};