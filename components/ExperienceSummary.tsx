"use client";
import { useEffect, useState, useRef } from "react";
import { stats } from "../utils/constants";

const useCountUp = (isVisible: boolean, target: number, duration: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return; // Start counting only when the section is visible

    let start = 0;
    const steps = Math.ceil(duration / 3);
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(Math.ceil(start));
    }, 5);

    return () => clearInterval(timer);
  }, [target, duration, isVisible]);

  return count;
};

const StatItem: React.FC<{
  label: string;
  count: number;
  isVisible: boolean;
}> = ({ label, count, isVisible }) => {
  const animatedCount = useCountUp(isVisible, count, 1000);

  return (
    <div className="text-center bg-cardBG border-[1px] gap-1 border-textGray/20 w-full h-40 md:w-56 md:h-56 justify-center flex flex-col items-center rounded-2xl relative overflow-hidden">
      <h4 className="text-5xl font-raleway font-semibold uppercase">
        {animatedCount}+
      </h4>
      <div className="absolute h-24 w-24 blur-3xl -top-12 rounded-full bg-blueGlow"></div>
      <p className="text-xl font-light uppercase">{label}</p>
    </div>
  );
};

export const ExperienceSummary: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger the animation when the section is visible
          observer.disconnect(); // Disconnect after triggering to avoid re-triggering
        }
      },
      { threshold: 0.3 } // Adjust threshold to trigger when 30% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full md:max-w-screen-lg px-4 mx-auto grid grid-cols-2 md:flex flex-col md:flex-row items-center gap-4 md:gap-4 lg:gap-0 justify-around text-white"
    >
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          label={stat.label}
          count={Number(stat.count)}
          isVisible={isVisible}
        />
      ))}
    </section>
  );
};

export default ExperienceSummary;
