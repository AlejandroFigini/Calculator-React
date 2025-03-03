import { motion } from "framer-motion";

export function BlinkingCurson() {



    return (
        <motion.span
        className={`prueba ${reuslt != '' ? "noview" : "siview"}`}
            animate={{ 
                opacity: [1, 0, 1] ,
            }}
            transition={{ duration: 1, repeat: Infinity }}
        >
        _
        </motion.span>
    )
}