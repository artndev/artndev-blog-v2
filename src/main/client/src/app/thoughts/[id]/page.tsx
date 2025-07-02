'use client'

import { useParams } from 'next/navigation';
import ThoughtPreview from '../_components/thought-preview';

export default function ThoughtPage() {
  const params = useParams<{ id: string; }>()
  
  console.log(params.id)

  return (
    <div className="flex justify-center items-center w-full">
      <ThoughtPreview 
        title="Test"
        content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?"
        updated="02/07/2025"
      />
    </div>
  );
}
