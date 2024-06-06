'use client'

import { useEffect, useState, Fragment } from "react"
import Header from "@/components/header"
import LiveMatch from "@/components/editMatch/liveMatch"

import { getMatch } from "@/services/matchService"

export default function EditMatch() {
    const [match, setMatch] = useState(null)
    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id')
        getMatch(id)
        .then(match => setMatch(match)
        ).catch(err => setMatch(null))
    }, [])

    return(
        <Fragment>
            <Header />
            <div className="container p-3">
                {
                    match ? <LiveMatch match={match} /> : <h4 className="text-amber-400 font-semibold text-center">Caricamento...</h4>
                }
            </div>
        </Fragment>
    )
}