"use client";

import Image from "next/image";
import styles from "./BookDetailsImg.module.css";
import { useEffect, useRef, useState } from "react";
import Skeleton from "../ui/Skeleton";

interface BookDetailsImgProps {
  src: string;
  alt: string;
}

export default function BookDetailsImg({ src, alt }: BookDetailsImgProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setImageLoaded(true);
  }, []);

  return (
    <div className={styles.bookDetailsImgWrapper}>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        priority
        ref={imgRef}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        className={styles.bookDetailsImg}
      />

      {!imageLoaded && <Skeleton className={styles.bookDetailsImgSkeleton} />}
    </div>
  );
}
