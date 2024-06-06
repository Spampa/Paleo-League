'use client'

import { useEffect, useState } from "react"
import { getMatchesByPhase } from "@/services/matchService"

import Match from "./match"
import Link from "next/link"

export default function Tournament() {
    const [matches, setMatches] = useState([])

    const [role] = useState(JSON.parse(localStorage.getItem('user')).role)

    useEffect(() => {
        getMatches("Ottavi")
    }, [])

    function getMatches(phase) {
        getMatchesByPhase(phase)
            .then(matches => setMatches(matches))
            .catch(error => console.error(error))
    }

    return (
        <div className="flex flex-col gap-2">
            <select className="p-2 rounded-md bg-slate-900 text-amber-400" onChange={(e) => getMatches(e.target.value)}>
                <option value={"Ottavi"}>Ottavi</option>
                <option value={"Quarti"}>Quarti</option>
                <option value={"Semifinali"}>Semifinali</option>
                <option value={"Finale"}>Finale</option>
            </select>
            {
                role === 'admin' ?
                    <Link href="/create-match">
                        <button className="bg-sky-700 rounded-md p-2">Crea Partita</button>
                    </Link>
                    : null
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {matches.map(match => <Match key={match.matchId} match={match} />)}
            </div>
        </div>
    )
}