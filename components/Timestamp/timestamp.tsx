export default function TimeStamp({ date, type }: { date?: string, type: "Entrada" | "Salida" }) {
    return (
        <section className={`${type === "Entrada" && date ? "fade-in-delay-400" : type === "Entrada" && !date ? "fade-in-delay-400-v2" : type === "Salida" && date ? "fade-in-delay-800" : type === "Salida" && !date && "fade-in-delay-800-v2"} flex px-5 py-2.5 items-center text-xs justify-between w-full border border-zinc-300 rounded-[10px]`}>
            <section className='flex gap-2.5 items-center w-full'>
                <span className={`w-2 h-2 rounded-full ${type === "Entrada" ? "bg-green-500" : type == "Salida" && "bg-red-500"}`}></span>
                <p className=' text-zinc-950 font-medium'>{type}</p>
            </section>
            <p className='font-medium text-zinc-700'>{date ? date : "TBD"}</p>
        </section>
    )
}