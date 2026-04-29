import Temporary from "@/components/for-you/Temporary";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Temporary />
      <br />
      <Link href={"/"}>Go back Home</Link>
    </>
  );
}
