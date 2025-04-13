import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & Lead Developer</h4>
                <h5>AgenticNex</h5>
              </div>
              <h3>2024-Present</h3>
            </div>
            <p>
              Founded AgenticNex, a platform for autonomous AI agents that streamline software development. Built prototypes for AI-driven code generation, UI/UX design, and project management. Won Top Performing Project, Startup Funding, and Department Best Awards in 2025.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Mentor</h4>
                <h5>AI Community</h5>
              </div>
              <h3>2024-Present</h3>
            </div>
            <p>
              Guided 25+ students in AI/ML and IoT projects, leading workshops on YOLO, OpenCV, and CrewAI. Mentored peers interested in artificial intelligence and computer vision technologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Developer</h4>
                <h5>Self-employed</h5>
              </div>
              <h3>2023-Present</h3>
            </div>
            <p>
              Delivered 12+ AI and automation projects, including Discord bots, NFT generators, and chatbots for global clients. Focused on secure, scalable solutions with real-time analytics using Python, Discord.py, Web3.js, and MongoDB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
