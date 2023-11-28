export default function Button({ onlyIcon, onClick, children, bordered }: { onlyIcon?: boolean, onClick?: () => any, children: React.ReactNode, bordered?: boolean }) {
    return (
        <button onClick={onClick} className={`relative ${onlyIcon ? "h-10 w-10 flex items-center justify-center" : "px-5 py-2.5 w-fit mx-auto rounded-[10px]"} font-medium text-xs text-zinc-950 ${bordered ? "border border-zinc-300 focus:border-blue-500" : ""}`}>
            {children}
        </button>
    )
}