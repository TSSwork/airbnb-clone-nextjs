import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
        <PuffLoader 
        color="#ff0061"
        size={100}
        />
    </div>
  )
}
