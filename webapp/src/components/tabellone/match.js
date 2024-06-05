export default function Match() {
    return (
        <div className="flex flex-row gap-1 rounded-md bg-slate-900 p-2 place-content-between">
            <div className="flex flex-row place-content-between p-3 w-full">
                <div className="flex flex-col gap-2">
                    <h5>Team 1</h5>
                    <h5>Team 2</h5>
                </div>
                <div className="flex flex-col gap-2">
                    <h5>3</h5>
                    <h5>0</h5>
                </div>
            </div>
            <div className="flex items-center border-l-2 p-3 border-zinc-500">
                <h4>08/06</h4>
            </div>
        </div>
    )
}