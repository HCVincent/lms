"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      height={100}
      width={100}
      alt="logo"
      src="/logo.svg"
      className="cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
