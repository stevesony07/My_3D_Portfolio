import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register both plugins together
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;

      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 120, // Increased from 80 to 120 to make it much slower
      delay: 0.2,
    });
  }, []);
  const projects = [
    {
      title: "AgenticNex AI Platform",
      category: "AI Development",
      tools: "Python, React.js, FastAPI, Qwen2.5-Coder, Firebase, Tailwind CSS",
      image: "/1742061190548.png",
      link: "https://agenticnex.com"
    },
    {
      title: "Fire Detection Alarm",
      category: "Computer Vision",
      tools: "Python, OpenCV, YOLOv8, Tkinter, Roboflow",
      image: "/image.jpg"
    },
    {
      title: "Face Recognition System",
      category: "Computer Vision",
      tools: "Python, OpenCV, DeepFace, NumPy",
      image: "/image (1).jpg"
    },
    {
      title: "IoT Health Monitoring",
      category: "IoT & Healthcare",
      tools: "Python, Scikit-learn, Flask, Raspberry Pi, Health Data APIs",
      image: "/images/iot-health.webp"
    },
    {
      title: "Nex: AI Calling Agent",
      category: "AI & Voice Technology",
      tools: "Python, TensorFlow, Flask, Twilio, Firebase",
      image: "/image (2).jpg",
      description: "Developed Nex, an AI-powered calling agent to automate admissions queries for Amal Jyothi College of Engineering, answering questions on courses, fees, facilities, and eligibility using NLP. Reduced staff workload by 60%, improving student access."
    },
    {
      title: "FinBookGlobal Forecasting",
      category: "Data Science & Finance",
      tools: "Python, Prophet, Pandas, Jupyter, Flask",
      image: "/fin.png",
      description: "Created a time series forecasting model for FinBookGlobal to predict future financial trends, such as revenue and market demand, achieving 90% accuracy using Facebook's Prophet library. Enabled businesses to plan strategically with precise future predictions."
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                {project.description && (
                  <>
                    <h4 style={{ marginTop: "15px" }}>Description</h4>
                    <p>{project.description}</p>
                  </>
                )}
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
