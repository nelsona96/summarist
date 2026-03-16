import { ReactNode } from "react";
import styles from "./StatisticsDetails.module.css";

interface StatisticsDetailsProps {
  variant: "first" | "second";
}

interface StatisticsDetailsData {
  percentages: string[];
  details: ReactNode[];
}

const statisticsDetailsData: Record<
  StatisticsDetailsProps["variant"],
  StatisticsDetailsData
> = {
  first: {
    percentages: ["93%", "96%", "90%"],
    details: [
      <>
        of Summarist members <strong>significantly increase</strong> reading
        frequency.
      </>,
      <>
        of Summarist members <strong>establish better</strong> habits.
      </>,
      <>
        have made <strong>significant positive</strong> change to their lives.
      </>,
    ],
  },
  second: {
    percentages: ["91%", "94%", "88%"],
    details: [
      <>
        of Summarist members <strong>report feeling more productive</strong>{" "}
        after incorporating the service into their daily routine.
      </>,
      <>
        of Summarist members have <strong>noticed an improvement</strong> in
        their overall comprehension and retention of information.
      </>,
      <>
        of Summarist members <strong>feel more informed</strong> about current
        events and industry trends since using the platform.
      </>,
    ],
  },
};

export default function StatisticsDetails({ variant }: StatisticsDetailsProps) {
  const data = statisticsDetailsData[variant];

  return (
    <ul className={styles.detailsWrapper}>
      {data.details.map((detail, index) => (
        <li key={index} className={styles.detailWrapper}>
          <span className={styles.percentage}>{data.percentages[index]} </span>
          <span className={styles.detail}>{detail}</span>
        </li>
      ))}
    </ul>
  );
}
