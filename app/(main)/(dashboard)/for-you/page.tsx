import Temporary from "@/components/for-you/Temporary";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Temporary />
      <Link href={"/"}>Go back Home</Link>
    </>
  );
}
