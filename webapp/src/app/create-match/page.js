'use client'

import Header from "@/components/header"

import { useState, useEffect, Fragment } from "react"
import { getAllTeams } from "@/services/teamService"
import { createMatch } from "@/services/matchService"

export default function CreateMatch() {
    const [teams, setTeams] = useState([])
    const [match, setMatch] = useState({})
    useEffect(() => {
        getAllTeams()
            .then(teams => setTeams(teams))
            .catch(error => console.error(error))
    }, [])

    function createMatchHandler() {
        console.log("Creating match", match)
        createMatch(match)
            .then(() => alert("Partita creata con successo"))
            .catch(error => console.error(error))
    }

    return(
        <Fragment>
            <Header />
            <div className="container p-3">
                <h1>Crea Partita</h1>
                <div className="flex flex-col gap-2">
                    <select className="p-2 rounded-md bg-slate-900 text-amber-400" onChange={(e) => setMatch({...match, homeTeam: parseInt(e.target.value)})}>
                        {teams.map(team => <option key={team.team_id} value={team.team_id}>{team.name}</option>)}
                    </select>
                    <select className="p-2 rounded-md bg-slate-900 text-amber-400" onChange={(e) => setMatch({...match, awayTeam: parseInt(e.target.value)})}>
                        {teams.map(team => <option key={team.team_id} value={team.team_id}>{team.name}</option>)}
                    </select>
                    <input className="p-2 rounded-md bg-slate-900 text-amber-400" type="text" placeholder="Fase" onChange={(e) => setMatch({...match, tournamentPhase: e.target.value})} />
                    <input className="p-2 rounded-md bg-slate-900 text-amber-400" type="datetime-local" onChange={(e) => setMatch({...match, matchDate: e.target.value})} />
                    <button className="bg-sky-700 rounded-md p-2" onClick={() => createMatchHandler()}>Crea Partita</button>
                </div>
            </div>
        </Fragment>
    )
}