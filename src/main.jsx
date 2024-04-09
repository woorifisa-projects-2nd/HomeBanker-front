import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import colors from './style/theme.js'
// import CookiesProvider from '../node_modules/react-cookie/cjs/CookiesProvider.js'

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  // <CookiesProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  // </CookiesProvider>
)
