import { motion } from "framer-motion";

export default function SignButton({ type, onClick }: { type: "Entrada" | "Salida", onClick?: () => void }) {
    return (
        <motion.button
            type="submit"
            initial={{ opacity: 0, scale: 0.5, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ stiffness: 100 }}
            onClick={onClick} className={`focus:outline-none w-[200px] h-[200px] rounded-full drop-shadow-[0_5px_15px_#52525B25] ${type === "Entrada" ? "bg-green-500" : type === "Salida" && "bg-red-500"} text-white font-medium flex gap-2 items-center justify-center transition-colors`}>
            Fichar<p className="lowercase"> {type}</p>
        </motion.button>
    )
}