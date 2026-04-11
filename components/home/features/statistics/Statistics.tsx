import styles from "./Statistics.module.css";
import clsx from "clsx";
import StatisticsDetails from "./StatisticsDetails";
import StatisticsHeadings from "./StatisticsHeadings";

interface StatisticsProps {
  variant: "first" | "second";
  delay?: boolean;
}

export default function Statistics({ variant, delay }: StatisticsProps) {
  return (
    <div
      className={clsx(
        styles.statisticsWrapper,
        variant === "second" && styles.flexReverse,
      )}
    >
      <StatisticsHeadings variant={variant} delay={delay} />
      <StatisticsDetails variant={variant} />
    </div>
  );
}
