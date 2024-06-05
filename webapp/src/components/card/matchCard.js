'use client'

import { useRouter } from 'next/navigation'

export default function MatchCard() {
    const router = useRouter()
    return(
        <div className="p-3 rounded-sm bg-slate-800 text-slate-100 flex flex-col gap-3">
            <div className="grid grid-cols-3">
                <p className=" text-amber-100">Ottavi di finale</p>
                <p className="text-center text-zinc-400">10:30</p>
                <p></p>
            </div>
            <div className="grid grid-cols-3 ">
                <div className="flex flex-col items-center">
                    <h5>Squadra 1</h5>
                </div>
                <div className="flex flex-row items-center place-content-center">
                    <h4>-</h4>
                </div>
                <div className="flex flex-col items-center">
                    <h5>Squadra 2</h5>
                </div>
            </div>
            <div className="flex flex-row place-content-between">
                <div></div>
                <button className="bg-sky-700 rounded-sm p-1" onClick={() => router.push('/edit-match')}>Aggiorna</button>
            </div>
        </div>
    )
}