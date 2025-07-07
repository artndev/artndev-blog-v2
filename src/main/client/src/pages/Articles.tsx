import axios from '@/lib/axios.js'
import ArticleCard from '@/pages/components/ArticleCard'
import ArticleCardSkeleton from '@/pages/skeletons/ArticleCardSkeleton'
import type { I_Article, I_AxiosResponse } from '@/types'
import { useEffect, useState } from 'react'

// const articles = [
//   {
//     id: 1,
//     title: 'Generating AI videos using model',
//     subtitle:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date().toString(),
//   },
//   {
//     id: 2,
//     title: 'Test2',
//     subtitle:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date().toString(),
//   },
//   {
//     id: 3,
//     title: 'Test3',
//     subtitle:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date().toString(),
//   },
// ]

const Articles = () => {
  const [articles, setArticles] = useState<I_Article[] | null>(null)

  useEffect(() => {
    axios
      .get('/articles')
      .then((res: I_AxiosResponse<I_Article[]>) => setArticles(res.data.answer))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      {articles?.length ? (
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-12 w-[min(1000px,_100%)]">
            {articles.map((article, i) => {
              return (
                <ArticleCard
                  id={article.id}
                  title={article.title}
                  content={article.subtitle}
                  updated={new Date(article.updated).toLocaleDateString(
                    'en-GB',
                    {
                      timeZone: 'UTC',
                    }
                  )}
                  key={i}
                />
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <ArticleCardSkeleton />
        </div>
      )}
    </>
  )
}

export default Articles
