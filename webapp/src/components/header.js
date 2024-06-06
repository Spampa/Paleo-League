'use client'

import Link from "next/link"

import { useState } from "react"

export default function Header() {
    const [user] = useState(JSON.parse(localStorage.getItem('user')))
    return(
        <div className="p-3 bg-zinc-800 text-amber-400 flex flex-row place-content-between items-center ">
            <h1 className="font-semibold text-lg md:text-2xl">Paleo League</h1>
            <div className="flex flex-row gap-6 items-center">
                <div className="flex flex-row gap-1">
                    <Link href="/">Home</Link>
                </div>
                <div className="flex flex-row gap-1">
                    <Link href="/partite">Partite</Link>
                </div>
                <div>
                    <img src={user?.profile || ""} className="w-8 h-8 rounded-full" />
                </div>
            </div>
        </div>
    )
}