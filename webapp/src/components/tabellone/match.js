export default function Match({match}) {
    return (
        <div className="flex flex-row gap-1 rounded-md bg-slate-900 p-2 place-content-between">
            <div className="flex flex-row place-content-between p-3 w-full">
                <div className="flex flex-col gap-2">
                    <h5>{match.homeTeam.name}</h5>
                    <h5>{match.awayTeam.name}</h5>
                </div>
                <div className="flex flex-col gap-2">
                    <h5>{typeof match.homeScore === 'number' ? match.homeScore : "-"}</h5>
                    <h5>{typeof match.awayScore === 'number' ? match.awayScore : "-"}</h5>
                </div>
            </div>
            <div className="flex items-center border-l-2 p-3 border-zinc-500">
                <h4>08/06</h4>
            </div>
        </div>
    )
}