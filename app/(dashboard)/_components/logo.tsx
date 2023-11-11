"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image height={100} width={100} alt="logo" src="/logo.svg" />
      <span className="font-bold text-2xl">Courses</span>
    </div>
  );
};

export default Logo;
