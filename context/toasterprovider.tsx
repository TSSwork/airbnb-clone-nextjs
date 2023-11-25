"use client"

import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useTheme } from './themecontext';



export default function ToasterProvider() {
  const {theme} = useTheme();
  return (
    
    <Toaster
    position="top-center"
    reverseOrder={false}
    toastOptions={{
      duration: 4000,
      style: {
        border: (theme === 'dark') ? '2px solid #333333' : '2px solid #ffffff',
        background: (theme === 'dark') ? '#333' : '#fff',
        color: (theme === 'dark') ? '#fff' : '#333'
      },
    }}
  />
  )
}
