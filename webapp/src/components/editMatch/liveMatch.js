'use client';

import { useState } from "react";
import { updateMatchGoal } from "@/services/matchService";

export default function LiveMatch({match}) {
    const [homeScore, setHomeScore] = useState(match.homeScore)
    const [awayScore, setAwayScore] = useState(match.awayScore)

    function updateScore(team, value){
        updateMatchGoal(match.matchId, team, value)
        .then(updatedMatch => {
            setHomeScore(updatedMatch.homeScore)
            setAwayScore(updatedMatch.awayScore)
        })
        .catch(err => console.error(err))
    }

    return (
        <div className="rounded-md bg-slate-900 p-3 text-white flex flex-col gap-3">
            <div className="grid grid-cols-3 w-full px-10">
                <div className="flex flex-col items-center">
                    <h4>{match.homeTeam.name}</h4>
                </div>
                <div className="flex flex-row gap-2 items-center place-content-center">
                    <div className="flex flex-row">
                        <button className="bg-green-700 rounded-l-md px-2 py-1" onClick={() => updateScore("home", 1)}>+</button>
                        <h2 className="bg-white text-black px-1">{homeScore}</h2>
                        <button className="bg-red-700 rounded-r-md px-2 py-1" onClick={() => updateScore("home", -1)}>-</button>
                    </div>
                    <h2>-</h2>
                    <div className="flex flex-row">
                        <button className="bg-green-700 rounded-l-md px-2 py-1" onClick={() => updateScore("away", 1)}>+</button>
                        <h2 className="bg-white text-black px-1">{awayScore}</h2>
                        <button className="bg-red-700 rounded-r-md px-2 py-1" onClick={() => updateScore("away", -1)}>-</button>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h4>{match.awayTeam.name}</h4>
                </div>
            </div>
            <div className="flex flex-row gap-1 place-content-between">
                <button className="bg-red-700 rounded-sm p-1">Fine Partita</button>
            </div>
        </div>
    )
}