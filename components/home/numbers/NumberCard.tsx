import styles from "./NumberCard.module.css";
import {
  RiLeafLine,
  RiStarFill,
  RiStarHalfFill,
  RiVipCrownLine,
} from "react-icons/ri";

interface NumberProps {
  variant: "downloads" | "ratings" | "results";
}

interface NumberData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const numberData: Record<NumberProps["variant"], NumberData> = {
  downloads: {
    icon: <RiVipCrownLine aria-hidden="true" className={styles.numberIcon} />,
    title: "3 Million",
    description: "Downloads on all platforms",
  },
  ratings: {
    icon: (
      <span aria-hidden="true" className={styles.numberStars}>
        <RiStarFill />
        <RiStarFill />
        <RiStarFill />
        <RiStarFill />
        <RiStarHalfFill />
      </span>
    ),
    title: "4.5 Stars",
    description: "Average ratings on iOS and Google Play",
  },
  results: {
    icon: <RiLeafLine aria-hidden="true" className={styles.numberIcon} />,
    title: "97%",
    description: "Of Summarist members create a better reading habit",
  },
};

export default function NumberCard({ variant }: NumberProps) {
  const data = numberData[variant];

  return (
    <div className={styles.numberCard}>
      {data.icon}
      <p className={styles.numberTitle}>{data.title}</p>
      <p className={styles.numberPara}>{data.description}</p>
    </div>
  );
}
