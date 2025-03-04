import { motion } from "framer-motion";

export function BlinkingCurson({ result }) {
    return (
        <motion.span
            animate={result === 0 ? { display: "inline-block", opacity: [1, 0, 1] } : { display: "none" }}
            transition={{ opacity: { duration: 1, repeat: Infinity } }}
        >
            _
        </motion.span>
    );
}
