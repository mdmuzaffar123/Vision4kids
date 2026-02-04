import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, description, index }) {
  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <div className="feature-icon-wrapper">
        <span className="feature-icon">{icon}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="feature-highlight"></div>
    </motion.div>
  );
}
