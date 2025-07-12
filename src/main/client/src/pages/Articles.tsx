import axios from '@/lib/axios.js'
import ArticleCard from '@/pages/components/ArticleCard'
import ArticleCardSkeleton from '@/pages/skeletons/ArticleCardSkeleton'
import type { I_Article, I_AxiosError, I_AxiosResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const [articles, setArticles] = useState<I_Article[] | null>(null)

  useEffect(() => {
    axios
      .get('/articles')
      .then((res: I_AxiosResponse<I_Article[]>) => setArticles(res.data.answer))
      .catch((err: I_AxiosError) => {
        console.log(err)

        navigate(`/error${err?.status && `?code=${err.status}`}`)
      })
  }, [])

  return (
    <>
      {articles?.length ? (
        <div className="flex justify-center w-full">
          <div className="w-[min(1000px,_100%)]">
            <div className="flex flex-col gap-12 w-full">
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
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      }
                    )}
                    i={i}
                    key={i}
                  />
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="w-[min(1000px,_100%)]">
            <ArticleCardSkeleton />
          </div>
        </div>
      )}
    </>
  )
}

export default Articles
