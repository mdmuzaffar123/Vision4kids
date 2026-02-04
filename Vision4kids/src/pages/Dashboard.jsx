import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    blockedContent: 42,
    screenTime: "2h 35m",
    safeStatus: "Active",
    sitesVisited: 156,
    alertsToday: 3
  });

  const [animatedStats, setAnimatedStats] = useState({
    blockedContent: 0,
    sitesVisited: 0
  });

  useEffect(() => {
    // Animate numbers
    const animateNumber = (start, end, duration = 2000) => {
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        return Math.floor(start + (end - start) * progress);
      };

      let current = start;
      const step = () => {
        current = animate(current + 1);
        if (current < end) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    animateNumber(0, stats.blockedContent);
    animateNumber(0, stats.sitesVisited);
  }, []);

  const dashboardCards = [
    { title: "Blocked Content", value: stats.blockedContent, icon: "🚫", color: "danger" },
    { title: "Screen Time", value: stats.screenTime, icon: "⏱️", color: "warning" },
    { title: "Safe Status", value: stats.safeStatus, icon: "✅", color: "success" },
    { title: "Sites Visited", value: stats.sitesVisited, icon: "🌐", color: "primary" },
    { title: "Alerts Today", value: stats.alertsToday, icon: "🔔", color: "accent" }
  ];

  return (
    <section id="dashboard" className="dashboard">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Parent <span>Dashboard</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        className="dashboard-subtitle"
      >
        Real-time monitoring and complete control over your child's online activities
      </motion.p>

      <div className="dashboard-grid">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            className={`dashboard-card card-${card.color}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p className="card-value">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        className="dashboard-activity"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item blocked">
            <span className="activity-time">10:45 AM</span>
            <span className="activity-text">Blocked access to harmful website</span>
            <span className="activity-badge">Blocked</span>
          </div>
          <div className="activity-item allowed">
            <span className="activity-time">09:30 AM</span>
            <span className="activity-text">YouTube access - Educational video</span>
            <span className="activity-badge">Allowed</span>
          </div>
          <div className="activity-item blocked">
            <span className="activity-time">08:15 AM</span>
            <span className="activity-text">Inappropriate image detected and removed</span>
            <span className="activity-badge">Blocked</span>
          </div>
          <div className="activity-item allowed">
            <span className="activity-time">07:20 AM</span>
            <span className="activity-text">Khan Academy - Math lesson</span>
            <span className="activity-badge">Allowed</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="dashboard-quick-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="stat-box">
          <h4>Protection Level</h4>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <span>98% Protected</span>
        </div>
        <div className="stat-box">
          <h4>Daily Usage</h4>
          <div className="usage-chart">
            <div className="chart-bar" style={{ height: "60%" }}></div>
            <div className="chart-bar" style={{ height: "75%" }}></div>
            <div className="chart-bar" style={{ height: "45%" }}></div>
            <div className="chart-bar" style={{ height: "80%" }}></div>
            <div className="chart-bar" style={{ height: "50%" }}></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
