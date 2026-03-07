import type { ReviewData } from "@/types/review";
import styles from "./Reviews.module.css";
import Button from "@/components/ui/Button";
import Review from "./Review";

// Pre-set data to emulate pulling from a database:
const reviewsData: ReviewData[] = [
  {
    name: "Hanna M.",
    message: (
      <>
        This app has been a <strong>game-changer</strong> for me! It's saved me
        so much time and effort in reading and comprehending books. Highly
        recommend it to all book lovers.
      </>
    ),
    rating: 5,
  },
  {
    name: "David B.",
    message: (
      <>
        I love this app! It provides{" "}
        <strong>concise and accurate summaries</strong> of books in a way that
        is easy to understand. It's also very user-friendly and intuitive.
      </>
    ),
    rating: 5,
  },
  {
    name: "Nathan S.",
    message: (
      <>
        This app is a great way to get the main takeaways from a book without
        having to read the entire thing.{" "}
        <strong>The summaries are well-written and informative.</strong>{" "}
        Definitely worth downloading.
      </>
    ),
    rating: 5,
  },
  {
    name: "Ryan R.",
    message: (
      <>
        If you're a busy person who{" "}
        <strong>loves reading but doesn't have the time</strong> to read every
        book in full, this app is for you! The summaries are thorough and
        provide a great overview of the book's content.
      </>
    ),
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" aria-label="Reviews" className={`homeSection`}>
      <div className={`container`}>
        <div className={styles.reviewsWrapper}>
          <h2 className={`sectionTitle`}>What our members say</h2>
          {reviewsData.map((review, index) => (
            <Review key={index} {...review} />
          ))}
          <Button variant="homeCta" type="button" label="Login" />
        </div>
      </div>
    </section>
  );
}
