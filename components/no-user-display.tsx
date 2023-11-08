"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NoUserDisplay = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Image
        src="/images/nologindisplay.svg"
        width={256}
        height={256}
        alt="no logged in yet"
      />
      <div className="flex flex-row items-center space-x-2">
        <span>You are not logged in, please</span>
        <Button variant="ghost" onClick={() => router.push("/sign-in")}>
          Log In
        </Button>
        or
        <Button variant="outline" onClick={() => router.push("/sign-up")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default NoUserDisplay;
