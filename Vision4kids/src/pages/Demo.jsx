import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Guardian from "../components/Guardian";

export default function Demo() {
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const [danger, setDanger] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [detectionMessage, setDetectionMessage] = useState("");
  const [safeContent, setSafeContent] = useState(null);
  const [detectionHistory, setDetectionHistory] = useState([]);

  const safeContentOptions = [
    { title: "Educational - Math Basics", emoji: "📐", video: "dQw4w9WgXcQ" },
    { title: "Kids Cartoon - Adventure", emoji: "🎬", video: "jNQXAC9IVRw" },
    { title: "DIY Crafts Tutorial", emoji: "🎨", video: "dQw4w9WgXcQ" },
    { title: "Funny Kids Comedy", emoji: "😂", video: "jNQXAC9IVRw" },
    { title: "Science Experiment", emoji: "🔬", video: "dQw4w9WgXcQ" },
    { title: "Nature Documentary", emoji: "🌿", video: "jNQXAC9IVRw" },
  ];

  // Simulate content detection
  useEffect(() => {
    if (youtubeOpen && isCameraActive) {
      const detectionInterval = setInterval(() => {
        // Simulate random content detection
        const isHarmfulContent = Math.random() > 0.6;

        if (isHarmfulContent) {
          setDanger(true);
          setDetectionMessage("⚠️ Inappropriate Content Detected!");

          // Auto-shift to safe content
          const randomSafe = safeContentOptions[Math.floor(Math.random() * safeContentOptions.length)];
          setSafeContent(randomSafe);

          // Add to history
          setDetectionHistory((prev) => [
            {
              time: new Date().toLocaleTimeString(),
              message: "Harmful content blocked",
              content: randomSafe.title,
            },
            ...prev.slice(0, 4),
          ]);

          // Auto-switch after 2 seconds
          setTimeout(() => {
            setDanger(false);
            setDetectionMessage("✅ Switched to Safe Content!");

            // Switch YouTube video
            if (iframeRef.current) {
              const newSrc = `https://www.youtube.com/embed/${randomSafe.video}?autoplay=1`;
              iframeRef.current.src = newSrc;
            }

            setTimeout(() => {
              setDetectionMessage("");
            }, 2000);
          }, 2000);
        }
      }, 5000); // Check every 5 seconds

      return () => clearInterval(detectionInterval);
    }
  }, [youtubeOpen, isCameraActive]);

  // Start camera
  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 280, height: 210 } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsCameraActive(true);
          }
        })
        .catch((error) => {
          console.warn("Camera access denied:", error);
          alert("Camera permission denied. Please enable camera access.");
        });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraActive(false);
    }
    setYoutubeOpen(false);
    setDanger(false);
    setDetectionMessage("");
    setSafeContent(null);
  };

  // Open YouTube with camera
  const openYoutubeDemo = () => {
    setYoutubeOpen(true);
    startCamera();
  };

  return (
    <section id="demo" className="demo">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        AI Content <span>Detection Demo</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        className="demo-subtitle"
      >
        See how KidSafe detects harmful content and automatically switches to safe alternatives
      </motion.p>

      {!youtubeOpen ? (
        <motion.div
          className="demo-inactive"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="demo-preview">
            <Guardian active={false} />
            <p>Click below to start the live demo</p>
          </div>

          <button className="btn-primary demo-start-btn" onClick={openYoutubeDemo}>
            🎥 Start Live Demo
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="demo-active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="demo-container-active">
            {/* YouTube Player */}
            <motion.div
              className={`youtube-container ${danger ? "danger-mode" : ""}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="YouTube Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {danger && (
                <motion.div
                  className="demo-danger-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="danger-pulse">
                    <h3>🚫 Harmful Content Detected!</h3>
                    <p>Automatically blocking and switching to safe content...</p>
                  </div>
                </motion.div>
              )}

              {safeContent && (
                <motion.div
                  className="safe-content-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <span className="badge-emoji">{safeContent.emoji}</span>
                  <span className="badge-text">Switched to: {safeContent.title}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Camera Feed */}
            <motion.div
              className="camera-feed-container"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                className="camera-feed"
              />
              <div className="camera-label">📷 Your Camera</div>
              {isCameraActive && <div className="camera-active-indicator">🔴 LIVE</div>}
            </motion.div>
          </div>

          {/* Detection Message */}
          {detectionMessage && (
            <motion.div
              className={`detection-message ${danger ? "danger" : "safe"}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {detectionMessage}
            </motion.div>
          )}

          {/* Controls */}
          <div className="demo-controls">
            <button className="btn-danger" onClick={() => setDanger(true)}>
              🚫 Simulate Harmful Content
            </button>
            <button className="btn-success" onClick={() => setDanger(false)}>
              ✅ Reset to Normal
            </button>
            <button className="btn-outline" onClick={stopCamera}>
              ❌ End Demo
            </button>
          </div>

          {/* Detection History */}
          <motion.div
            className="detection-history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3>📋 Detection History</h3>
            <div className="history-list">
              {detectionHistory.length > 0 ? (
                detectionHistory.map((item, idx) => (
                  <div key={idx} className="history-item">
                    <span className="history-time">{item.time}</span>
                    <span className="history-message">{item.message}</span>
                    <span className="history-content">{item.content}</span>
                  </div>
                ))
              ) : (
                <div className="history-empty">No detections yet. Watching for harmful content...</div>
              )}
            </div>
          </motion.div>

          {/* Real-time Stats */}
          <motion.div
            className="demo-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="stat-item">
              <span className="stat-label">Detection Status</span>
              <span className={`stat-value ${danger ? "danger" : "safe"}`}>
                {danger ? "🚨 THREAT DETECTED" : "✅ SAFE"}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Camera</span>
              <span className="stat-value">{isCameraActive ? "🔴 ACTIVE" : "⚫ INACTIVE"}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Detections</span>
              <span className="stat-value">{detectionHistory.length}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
