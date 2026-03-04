import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import styles from "./Feature.module.css";

interface FeatureProps {
  variant: "readListen" | "find" | "briefcasts";
}

interface FeatureData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const featureData: Record<FeatureProps["variant"], FeatureData> = {
  readListen: {
    icon: <AiFillFileText aria-hidden="true" className={styles.featureIcon} />,
    title: "Read or listen",
    description: "Save time by getting the core ideas from the best books.",
  },
  find: {
    icon: <AiFillBulb aria-hidden="true" className={styles.featureIcon} />,
    title: "Find your next read",
    description: "Explore book lists and personalized recommendations.",
  },
  briefcasts: {
    icon: <AiFillAudio aria-hidden="true" className={styles.featureIcon} />,
    title: "Briefcasts",
    description: "Gain valuable insights from briefcasts.",
  },
};

export default function Feature({ variant }: FeatureProps) {
  const data = featureData[variant];

  return (
    <article className={styles.featureContainer}>
      {data.icon}
      <h3 className={styles.featureTitle}>{data.title}</h3>
      <p className={styles.featurePara}>{data.description}</p>
    </article>
  );
}
