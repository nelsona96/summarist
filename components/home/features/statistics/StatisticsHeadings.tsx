import styles from "./StatisticsHeadings.module.css";

interface StatisticsHeadingsProps {
  variant: "first" | "second";
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
      "Be the best version of yourself!",
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
}: StatisticsHeadingsProps) {
  const headings = statisticsHeadingsData[variant].headings;

  return (
    <ul className={styles.headingsWrapper}>
      {headings.map(
        (heading, index) => (
          <li key={index} className={styles.heading}>
            {heading}
          </li>
        ),
      )}
    </ul>
  );
}
