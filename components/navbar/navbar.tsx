"use client"

import React from 'react'
import Container from '../container'
import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/24/outline'
import Search from './search'
import UserMenu from './usermenu'
import Categories from './categories'

export default function NavBar() {
  return (
    <div className="fixed w-full bg-white dark:bg-gray-950 z-10 shadow-sm">
        <div className="Py-4 border-b-[1px] dark:border-black">
            <Container>
                <div className="flex felx-row items-center justify-between gap-3 mad:gap-0">
                    <Link href="/" className="flex item-center justify-start gap-2">
                        <HomeIcon className="w-[2rem] h-[2rem] text-rose-600"/>
                        <p className="text-rose-600 text-2xl font-semibold">airbnb</p>
                    </Link> 
                    <Search/>
                    <UserMenu />

                </div>
            </Container>
            <Categories />
        </div>
    </div>
  )
}
