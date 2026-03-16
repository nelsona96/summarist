import styles from "./Statistics.module.css";
import clsx from "clsx";
import StatisticsDetails from "./StatisticsDetails";
import StatisticsHeadings from "./StatisticsHeadings";

interface StatisticsProps {
  variant: "first" | "second";
}

export default function Statistics({ variant }: StatisticsProps) {
  return (
    <div
      className={clsx(
        styles.statisticsWrapper,
        variant === "second" && styles.flexReverse,
      )}
    >
      <StatisticsHeadings variant={variant} />
      <StatisticsDetails variant={variant} />
    </div>
  );
}
