import { useUser } from '@/context/usercontext'
import Image from 'next/image'
import React from 'react'

type AvatarProps = {
  src?: string | null;
}

export default function Avatar({
  src
}: AvatarProps) {

  const avatar = src;
  
  return (
    <div>
        <Image 
        src={ avatar || "/images/noavatar.png" }
        alt="user-avatar" width="30" height="30" className="rounded-full" />
    </div>
  )
}
