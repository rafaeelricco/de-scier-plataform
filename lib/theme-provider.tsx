'use client'

import { ThemeProvider } from '@material-tailwind/react'
import React from 'react'

export const MaterialTailwindThemeProvider: React.FC<{
   children: React.ReactNode
}> = ({ children }: { children: React.ReactNode }) => {
   return (
      <React.Fragment>
         <ThemeProvider>{children}</ThemeProvider>
      </React.Fragment>
   )
}
