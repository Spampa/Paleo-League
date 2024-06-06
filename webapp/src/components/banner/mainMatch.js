'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { endMatch } from '@/services/matchService';

export default function MainMatch({match}) {
    const router = useRouter()

    const [minutes, setMinutes] = useState(0);
    const [role] = useState(JSON.parse(localStorage.getItem('user')).role)

    useEffect(() => {
        const nowTime = new Date().getTime();
        const matchTime = new Date(match.startTime).getTime();
        const diff = nowTime - matchTime;
        const minutes = Math.floor(diff / 60000);
        setMinutes(minutes);
    }, [])
    
    function endMatchHandler(){
        endMatch(match.matchId)
        .then(() => window.location.reload())
        .catch(err => console.error(err))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutes(minutes => minutes + 1);
        }, 60000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="rounded-md bg-slate-900 p-3 text-white flex flex-col gap-3">
            <div className="grid grid-cols-3 w-full font-semibold">
                <p className=" text-amber-400">{match.tournamentPhase}</p>
                <p className="text-center">{minutes}'</p>
                <p className="text-right text-red-400">Live</p>
            </div>
            <div className="grid grid-cols-3 w-full px-10">
                <div className="flex flex-col items-center">
                    <h4>{match.homeTeam.name}</h4>
                </div>
                <div className="flex flex-row gap-2 items-center place-content-center">
                    <h2>{match?.homeScore || 0}</h2>
                    <h2>-</h2>
                    <h2>{match?.awayScore || 0}</h2>
                </div>
                <div className="flex flex-col items-center">
                    <h4>{match.awayTeam.name}</h4>
                </div>
            </div>
            {
                role === 'admin' ?
                    <div className="flex flex-row gap-1 place-content-between">
                        <button className="bg-red-700 rounded-sm p-1" onClick={() => endMatchHandler()}>Fine Partita</button>
                        <button className="bg-sky-700 rounded-sm p-1"onClick={() => router.push(`/edit-live?id=${match.matchId}`)}>Aggiorna</button>
                    </div>
                    : null
            }
        </div>

    )
}