'use client'

import { I_Article } from '@/app/_types';
import { useEffect, useState } from 'react';
import ThoughtPreview from '../_components/thought-preview';
import { getArticle } from '../actions';

export default function ThoughtPage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<I_Article | null>(null)

  useEffect(() => {
    getArticle(params.id)
      .then(res => setArticle(res.answer))
      .catch(err => console.log(err))
  }, [params.id])

  return (
    <div className="flex justify-center items-center w-full">
      {article && <ThoughtPreview 
        title={article.Title}
        content={article.Subtitle}
        updated={article.Updated}
      />}
    </div>
  );
}
