import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Card() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col gap-6 w-[max-content]">
        <h1 className="text-5xl font-semibold leading-none hanken-grotesk">
          Diary of my mind
        </h1>
        <Button className="max-w-[50%] justify-between">
          <span>
            Inspect
          </span>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
