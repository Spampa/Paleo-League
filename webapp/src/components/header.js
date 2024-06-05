import Link from "next/link"

export default function Header() {
    return(
        <div className="p-3 bg-zinc-800 text-amber-400 flex flex-row place-content-between items-center ">
            <h1 className="font-semibold text-lg md:text-2xl">Paleo League</h1>
            <div className="flex flex-row gap-6 items-center">
                <div className="flex flex-row gap-1">
                    <Link href="/">Home</Link>
                </div>
                <div className="flex flex-row gap-1">
                    <Link href="/partite">Partite</Link>
                </div>
            </div>
        </div>
    )
}