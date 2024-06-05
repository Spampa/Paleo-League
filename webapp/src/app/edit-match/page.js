import React from "react"
import Header from "@/components/header"
import PreMatch from "@/components/editMatch/preMatch"

export default function EditMatch() {
    return(
        <React.Fragment>
            <Header />
            <div className="container p-3">
                <PreMatch />
            </div>
        </React.Fragment>
    )
}