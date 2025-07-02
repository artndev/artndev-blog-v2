'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { I_ThoughtProps } from "../_types";

export default function ThoughtCard({ id, title, content, updated, className }: I_ThoughtProps) {
  const router = useRouter()

  return (
    <div className={cn(`flex flex-col gap-3 max-w-[500px]`, className)}>
      <span className="text-2xl font-semibold">{title}</span>
      <span>{content}</span>
      <span className="text-sm text-(--muted-foreground)">
        Updated at {updated}
      </span>
      <Button
        variant={"outline"}
        className="self-end w-[200px] rounded-full mt-3 cursor-pointer"
        onClick={() => router.push(`/thoughts/${id}`)}
      >
        Tell me more
      </Button>
    </div>
  );
}
