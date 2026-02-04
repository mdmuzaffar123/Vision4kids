import { motion } from "framer-motion";

export default function Testimonial({ text, author, role, image, index }) {
  return (
    <motion.div
      className="testimonial-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="testimonial-stars">
        ⭐ ⭐ ⭐ ⭐ ⭐
      </div>
      <p className="testimonial-text">"{text}"</p>
      <div className="testimonial-author">
        <img src={image} alt={author} className="author-avatar" />
        <div>
          <h4>{author}</h4>
          <span className="author-role">{role}</span>
        </div>
      </div>
    </motion.div>
  );
}

