import { useState } from "react";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Testimonial from "./components/Testimonial";
import { motion } from "framer-motion";
import "./dark-mode.css";

const testimonials = [
  {
    text: "KidSafe has given me peace of mind. I know my children are safe online without being too restrictive.",
    author: "Sarah Johnson",
    role: "Parent of 2",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    text: "The real-time alerts are fantastic! I caught something harmful before it could affect my 11-year-old.",
    author: "Michael Chen",
    role: "Parent of 1",
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    text: "Finally, a parental control app that actually works well and is easy to use. Highly recommended!",
    author: "Emma Williams",
    role: "Parent of 3",
    image: "https://i.pravatar.cc/150?img=3"
  }
];

function App() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (e) => {
    setScrollY(window.scrollY);
  };

  useState(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <Home />
      <Demo />
      <Dashboard />
      
      {/* Testimonials Section */}
      <section className="testimonials">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What <span>Parents Say</span>
        </motion.h2>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Protect Your Child?</h2>
          <p>Start your free trial today. No credit card required.</p>
          <button className="btn-primary cta-btn">Get Started Now</button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>KidSafe</h4>
            <p>Protecting children online with advanced AI technology.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#demo">Demo</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#twitter">Twitter</a>
              <a href="#facebook">Facebook</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 KidSafe. All rights reserved. Protecting kids, one click at a time.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
