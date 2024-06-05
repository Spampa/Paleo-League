'use client';

import { useRouter } from 'next/navigation';

export default function MainMatch() {
    const router = useRouter()
    return (
        <div className="rounded-md bg-slate-900 p-3 text-white flex flex-col gap-3">
            <div className="grid grid-cols-3 w-full font-semibold">
                <p className=" text-amber-400">Ottavi di finale</p>
                <p className="text-center">75'</p>
                <p className="text-right text-red-400">Live</p>
            </div>
            <div className="grid grid-cols-3 w-full px-10">
                <div className="flex flex-col items-center">
                    <h4>Team 1</h4>
                </div>
                <div className="flex flex-row gap-2 items-center place-content-center">
                    <h2>4</h2>
                    <h2>-</h2>
                    <h2>2</h2>
                </div>
                <div className="flex flex-col items-center">
                    <h4>Team 2</h4>
                </div>
            </div>
            <div className="flex flex-row gap-1 place-content-between">
                <button className="bg-red-700 rounded-sm p-1">Fine Partita</button>
                <button className="bg-sky-700 rounded-sm p-1"onClick={() => router.push('/edit-live')}>Aggiorna</button>
            </div>
        </div>

    )
}