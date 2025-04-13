import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
// Removed unused import: import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    // Add click event for both touch and non-touch devices
    containerRef.current.forEach((container) => {
      if (container) {
        // Keep the hover effect for desktop but also add click functionality
        container.addEventListener("click", () => handleClick(container));
      }
    });

    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI & DATA</h3>
              <h4>Description</h4>
              <p>
                Building intelligent systems that can analyze data, recognize patterns, and make decisions. Specializing in machine learning models, computer vision, and natural language processing.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">TensorFlow</div>
                <div className="what-tags">YOLOv8</div>
                <div className="what-tags">DeepFace</div>
                <div className="what-tags">NLP</div>
                <div className="what-tags">Pandas</div>
                <div className="what-tags">NumPy</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">CrewAI</div>
                <div className="what-tags">Roboflow</div>
              </div>
              <div className="what-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>WEB & IoT</h3>
              <h4>Description</h4>
              <p>
                Developing modern web applications and IoT solutions that connect the digital and physical worlds. Creating interactive experiences with cutting-edge technologies.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React.js</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">Tailwind CSS</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">Web3.js</div>
                <div className="what-tags">Solidity</div>
                <div className="what-tags">Raspberry Pi</div>
                <div className="what-tags">Arduino</div>
                <div className="what-tags">Firebase</div>
              </div>
              <div className="what-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
