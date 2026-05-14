"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./StatisticsHeadings.module.css";
import { useAppSelector } from "@/hooks/redux";

interface StatisticsHeadingsProps {
  variant: "first" | "second";
  delay?: boolean;
}

interface StatisticsHeadingsData {
  headings: string[];
}

const statisticsHeadingsData: Record<
  StatisticsHeadingsProps["variant"],
  StatisticsHeadingsData
> = {
  first: {
    headings: [
      "Enhance your knowledge",
      "Achieve greater success",
      "Improve your health",
      "Develop better parenting skills",
      "Increase happiness",
      "Be the best version of yourself",
    ],
  },
  second: {
    headings: [
      "Expand your learning",
      "Accomplish your goals",
      "Strengthen your vitality",
      "Become a better caregiver",
      "Improve your mood",
      "Maximize your abilities",
    ],
  },
};

export default function StatisticsHeadings({
  variant,
  delay,
}: StatisticsHeadingsProps) {
  const headings = useMemo(
    () => statisticsHeadingsData[variant].headings,
    [variant],
  );
  const { isAuthLoading } = useAppSelector((state) => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSplashScreenAnimating, setIsSplashScreenAnimating] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % headings.length);
    }, 2000);
  };

  useEffect(() => {
    // Wait for slashPhase === "animating" to be complete in SplashScreenToggle within Providers.tsx
    timerRef.current = setTimeout(() => {
      setIsSplashScreenAnimating(false);
    }, 2500);

    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isSplashScreenAnimating && !isAuthLoading) {
      if (delay) {
        setTimeout(() => {
          startInterval();
        }, 12000);
      } else {
        startInterval();
      }
    }

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [headings, isAuthLoading, isSplashScreenAnimating]);

  return (
    <ul className={styles.headingsWrapper}>
      {headings.map((heading, index) => (
        <li
          key={index}
          className={clsx(
            styles.heading,
            activeIndex === index && styles.highlight,
          )}
        >
          {heading}
        </li>
      ))}
    </ul>
  );
}
