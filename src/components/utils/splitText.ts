import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "../../gsap-plugins";
import { SplitText as SplitTextType, ScrollTriggerType } from "../../types/gsap-types";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitTextType;
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    // Cast SplitText to the correct type
    para.split = new (SplitText as any)(para, {
      type: "lines,words",
      linesClass: "split-line",
    }) as SplitTextType;

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    // Cast SplitText to the correct type
    title.split = new (SplitText as any)(title, {
      type: "chars,lines",
      linesClass: "split-line",
    }) as SplitTextType;
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  // Cast ScrollTrigger to the correct type
  (ScrollTrigger as unknown as ScrollTriggerType).addEventListener("refresh", () => setSplitText());
}
