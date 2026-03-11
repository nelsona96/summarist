import Features from "@/components/home/features/Features";
import Landing from "@/components/home/Landing";
import Numbers from "@/components/home/numbers/Numbers";
import Reviews from "@/components/home/reviews/Reviews";

export default function Home() {
  return (
    <main>
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
    </main>
  );
}
