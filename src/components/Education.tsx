import "./styles/Education.css";

const Education = () => {
  return (
    <div className="education-section section-container">
      <div className="education-container">
        <h2>
          My <span>Education</span>
        </h2>
        <div className="education-info">
          <div className="education-box">
            <div className="education-header">
              <h3>B.Tech in Artificial Intelligence & Data Science</h3>
              <span className="education-year">2024 - 2028</span>
            </div>
            <h4>Engineering College, Kerala</h4>
            <p>Expected Graduation: June 2028</p>
            <div className="education-courses">
              <h5>Relevant Coursework:</h5>
              <div className="education-tags">
                <span>Machine Learning</span>
                <span>Deep Learning</span>
                <span>Data Structures</span>
                <span>Big Data Analytics</span>
                <span>IoT</span>
                <span>Web Development</span>
              </div>
            </div>
          </div>
          <div className="education-box">
            <div className="education-header">
              <h3>Achievements & Awards</h3>
            </div>
            <ul className="achievements-list">
              <li>Top Performing Project Award 2025 for AgenticNex</li>
              <li>Startup Funding Award 2025</li>
              <li>Department Best Award 2025</li>
              <li>Best Innovation at Ideathon 2024 for IoT Health Monitoring System</li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
