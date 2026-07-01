import { Suspense } from "react";
import styles from "./page.module.css";
import clsx from "clsx";
import SelectedSection from "@/components/for-you/SelectedSection";
import RecommendedSection from "@/components/for-you/RecommendedSection";
import SuggestedSection from "@/components/for-you/SuggestedSection";
import SelectedSkeleton from "@/components/for-you/SelectedSkeleton";
import BookCarouselSkeleton from "@/components/book/BookCarouselSkeleton";

export default function Page() {
  return (
    <>
      <h1 className="srOnly">For You</h1>

      <section
        id="Selected"
        aria-labelledby="selected-heading"
        className={clsx("section", styles.section)}
      >
        <div className="container">
          <h2 id="selected-heading" className={styles.sectionTitle}>
            Selected Just For You
          </h2>

          <Suspense fallback={<SelectedSkeleton />}>
            <SelectedSection />
          </Suspense>
        </div>
      </section>

      <section
        id="Recommended"
        aria-labelledby="recommended-heading"
        className={clsx("section", styles.section)}
      >
        <div className="container">
          <h2 id="recommended-heading" className={styles.sectionTitle}>
            Recommended For You
          </h2>
          <p className={styles.sectionSubtitle}>
            We think you&apos;ll like these
          </p>

          <Suspense
            fallback={
              <BookCarouselSkeleton ariaLabel="Loading recommended books" />
            }
          >
            <RecommendedSection />
          </Suspense>
        </div>
      </section>

      <section
        id="Suggested"
        aria-labelledby="suggested-heading"
        className={clsx("section", styles.section)}
      >
        <div className="container">
          <h2 id="suggested-heading" className={styles.sectionTitle}>
            Suggested Books
          </h2>
          <p className={styles.sectionSubtitle}>Browse these books</p>

          <Suspense
            fallback={
              <BookCarouselSkeleton ariaLabel="Loading suggested books" />
            }
          >
            <SuggestedSection />
          </Suspense>
        </div>
      </section>
    </>
  );
}
