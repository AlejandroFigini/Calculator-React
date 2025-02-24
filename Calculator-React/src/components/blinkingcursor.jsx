import { motion } from "framer-motion";

export function BlinkingCurson() {



    return (
        <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
        >
            __
        </motion.span>
    )
}