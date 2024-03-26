import { ChakraProvider } from "../../node_modules/@chakra-ui/react/dist/chakra-provider"

import React from "react"

export default function Providers({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>
}
