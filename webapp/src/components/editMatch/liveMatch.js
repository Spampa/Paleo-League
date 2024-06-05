'use client';

export default function LiveMatch() {
    return (
        <div className="rounded-md bg-slate-900 p-3 text-white flex flex-col gap-3">
            <div className="grid grid-cols-3 w-full px-10">
                <div className="flex flex-col items-center">
                    <p>Image</p>
                    <h4>Team 1</h4>
                </div>
                <div className="flex flex-row gap-2 items-center place-content-center">
                    <input type="number" className="w-10 h-10 rounded-md bg-slate-800 text-slate-100 text-center" />
                    <h2>-</h2>
                    <input type="number" className="w-10 h-10 rounded-md bg-slate-800 text-slate-100 text-center" />
                </div>
                <div className="flex flex-col items-center">
                    <p>Image</p>
                    <h4>Team 2</h4>
                </div>
            </div>
            <div className="flex flex-row gap-1 place-content-between">
                <button className="bg-red-700 rounded-sm p-1">Fine Partita</button>
                <button className="bg-sky-700 rounded-sm p-1">Salva</button>
            </div>
        </div>
    )
}