import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import colors from './style/theme.js'
// import CookiesProvider from '../node_modules/react-cookie/cjs/CookiesProvider.js'

const theme = extendTheme({ colors })

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
// <<<<<<< HEAD
//   // <CookiesProvider>
//     <ChakraProvider theme={theme}>
//       <App />
//     </ChakraProvider>
//   // </CookiesProvider>
// =======
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ChakraProvider>
)
