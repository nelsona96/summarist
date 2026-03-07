import Features from "@/components/home/features/Features";
import Statistics from "@/components/home/features/statistics/Statistics";
import Landing from "@/components/home/Landing";
import Reviews from "@/components/home/reviews/Reviews";

export default function Home() {
  return (
    <main>
      <Landing />
      <Features />
      <Reviews />
    </main>
  );
}
