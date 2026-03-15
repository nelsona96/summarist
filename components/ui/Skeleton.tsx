import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width: string;
  height: string;
  borderRadius?: string;
  marginBottom?: string;
}

export default function Skeleton({
  width,
  height,
  borderRadius,
  marginBottom,
}: SkeletonProps) {
  const skeletonStyles: React.CSSProperties = {
    width: width,
    height: height,
    borderRadius: borderRadius,
    marginBottom: marginBottom,
  };

  return <div style={skeletonStyles} className={styles.skeleton}></div>;
}
