'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col gap-6 w-[max-content]">
        <div className="text-5xl font-semibold">
          Count <span className="jetbrains-mono">stunning</span> ideas.
        </div>
        <Button
          className="w-[200px] rounded-full cursor-pointer"
          onClick={() => router.push(`/thoughts`)}
        >
          Dive into my thoughts
        </Button>
      </div>
    </div>
  );
}
