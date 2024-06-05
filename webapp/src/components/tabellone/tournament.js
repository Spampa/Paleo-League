import Match from "./match"
export default function Tournament() {
    return (
        <div className="flex flex-col gap-2">
            <select className="p-2 rounded-md bg-slate-900 text-amber-400">
                <option value={"ottavi"}>Ottavi</option>
                <option value={"quarti"}>Quarti</option>
                <option value={"semifinali"}>Semifinali</option>
                <option value={"finale"}>Finale</option>
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <Match />
            </div>
        </div>
    )
}