'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { I_ThoughtProps } from "../_types";

export default function ThoughtPreview({ title, content, updated, className }: Omit<I_ThoughtProps, "id">) {
  const router = useRouter()

  return (
    <div className={cn(`flex flex-col gap-3 max-w-[1000px]`, className)}>
      <span className="text-2xl font-semibold">{title}</span>
      <span>{content}</span>
      <span className="text-sm text-(--muted-foreground)">
        Updated at {updated}
      </span>
      <Button
        variant={"outline"}
        className="w-[200px] rounded-full mt-3 cursor-pointer"
        onClick={() => router.push(`/thoughts`)}
      >
        Back to surfing
      </Button>
    </div>
  );
}
