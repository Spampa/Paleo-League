'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { startMatch } from '@/services/matchService'

export default function MatchCard({ match }) {
    const router = useRouter()
    const [role] = useState(JSON.parse(localStorage.getItem('user')).role)

    function startMatchHandler() {
        startMatch(match.matchId)
            .then(() => window.location.reload())
            .catch(err => console.error(err))
    }

    return (
        <div className="p-3 rounded-sm bg-slate-800 text-slate-100 flex flex-col gap-3">
            <div className="grid grid-cols-3">
                <p className=" text-amber-100">{match.tournamentPhase}</p>
                <p className="text-center text-zinc-400">{
                    new Date(match.matchDate).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })
                }</p>
                <p></p>
            </div>
            <div className="grid grid-cols-3 ">
                <div className="flex flex-col items-start place-content-center">
                    {
                        match.homeTeam.name.length > 9 ? <h5 className='text-base'>{match.homeTeam.name}</h5> : <h5>{match.homeTeam.name}</h5>
                    }
                </div>
                <div className="flex flex-row items-center place-content-center">
                    <h4>-</h4>
                </div>
                <div className="flex flex-col items-end place-content-center">
                    {
                        match.awayTeam.name.length > 9 ? <h5 className='text-base'>{match.awayTeam.name}</h5> : <h5>{match.awayTeam.name}</h5>
                    }
                </div>
            </div>
            {
                role === 'admin' ?
                    <div className="flex flex-row place-content-between">
                        <div></div>
                        <button className="bg-green-700 rounded-sm p-1" onClick={() => startMatchHandler()}>Inizia Partita</button>
                    </div>
                    : null
            }

        </div>
    )
}