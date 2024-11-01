// 1. Import `extendTheme`
import '@fontsource/open-sans/300.css'
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ff3c00"
    },
  },
  fonts: {
    body: "Open Sans, sans-serif"
  },
  styles: {
    global: () => ({
        body: {
            bgImage: '/images/WaldosandCompanyBackground.jpg',
            bgRepeat: 'no-repeat',
            bgSize: 'cover'
        }
    })
  },
  components: {
    // Button
  }
});
