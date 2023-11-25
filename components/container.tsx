"use client"

import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}

export default function Container({children} : ContainerProps) {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-3">
         { children }       
    </div>
  )
}
