'use client'

import { useParams } from 'next/navigation'

export default function ThoughtPage() {
  const params = useParams<{ id: string; }>()

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[max-content]">
        <span className="text-5xl font-semibold">
          {params.id}
        </span>
      </div>
    </div>
  );
}
