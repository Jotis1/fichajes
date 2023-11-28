export default function Header({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <section className="flex flex-col gap-2.5 w-full items-center">
            <h1 className="uppercase text-4xl font-black text-zinc-950">{title}</h1>
            {subtitle && (
                <p className="text-center text-zinc-800">{subtitle}</p>
            )}
        </section>
    )
}