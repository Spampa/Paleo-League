import React from "react"
import Header from "@/components/header"
import LiveMatch from "@/components/editMatch/liveMatch"

export default function EditMatch() {
    return(
        <React.Fragment>
            <Header />
            <div className="container p-3">
                <LiveMatch />
            </div>
        </React.Fragment>
    )
}