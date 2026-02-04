import { motion } from "framer-motion";
import Guardian from "../components/Guardian";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    icon: "🛡️",
    title: "Real-Time Protection",
    description: "Instantly blocks harmful content like nudity, violence, and hate speech with AI-powered detection."
  },
  {
    icon: "📊",
    title: "Parental Dashboard",
    description: "Monitor activity, set time limits, and receive alerts about suspicious content in real-time."
  },
  {
    icon: "🔒",
    title: "Privacy First",
    description: "Your child's data is encrypted and never sold. Complete privacy protection guaranteed."
  },
  {
    icon: "⚡",
    title: "Fast & Lightweight",
    description: "Minimal impact on device performance with advanced optimization technology."
  },
  {
    icon: "🌍",
    title: "Multi-Platform",
    description: "Works seamlessly across iOS, Android, Mac, and Windows devices."
  },
  {
    icon: "🤖",
    title: "AI-Powered",
    description: "Machine learning continuously improves detection accuracy."
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Guardian active={false} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          AI Protection for <span>Kids Online</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          KidSafe protects children below 13 from harmful online content like nudity, violence, and abuse using advanced AI-powered monitoring. Parents get real-time alerts and complete control.
        </motion.p>

        <motion.div
          className="hero-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <button className="btn-primary">Start Free Trial</button>
          <button className="btn-outline">Watch Demo</button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Parents Trust <span>KidSafe</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="features-subtitle"
        >
          Comprehensive protection with peace of mind
        </motion.p>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
