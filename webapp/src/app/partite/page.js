import React from "react"
import Header from "@/components/header"
import Tournament from "@/components/tabellone/tournament"

export default function Tabellone() {
    return(
        <React.Fragment>
            <Header />
            <div className="container p-3">
                <Tournament />
            </div>
        </React.Fragment>
    )
}