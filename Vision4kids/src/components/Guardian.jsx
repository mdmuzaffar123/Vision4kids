import { motion } from "framer-motion";

export default function Guardian({ active }) {
  return (
    <motion.div
      animate={{ y: active ? -10 : 0 }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="guardian-container"
    >
      <div className="guardian">
        🤖
      </div>
      <p className="text-center mt-2" style={{ fontSize: "18px", fontWeight: "700", marginTop: "15px" }}>
        {active ? "Protecting Child" : "Monitoring"}
      </p>
    </motion.div>
  );
}
