import { Button } from '@/components/ui/button'
import axios from '@/lib/axios.js'
import ArticleCard from '@/pages/components/ArticleCard'
import ArticleCardSkeleton from '@/pages/skeletons/ArticleCardSkeleton'
import type { I_Article, I_AxiosError, I_AxiosResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { motion } from 'motion/react'

const articlesData = [
  {
    id: 10,
    title: 'Generating AI videos using model',
    subtitle:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    updated: new Date('Thu Jul 10 2025 10:52:20 GMT+0000').toString(),
  },
  {
    id: 9,
    title: 'Test2',
    subtitle:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    updated: new Date('Fri Jul 11 2025 10:52:20 GMT+0000').toString(),
  },
  {
    id: 8,
    title: 'Test3',
    subtitle:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    updated: new Date().toString(),
  },
]

const Articles = () => {
  // const navigate = useNavigate()
  const [articles, setArticles] = useState<I_Article[] | null>(articlesData)

  // useEffect(() => {
  //   axios
  //     .get('/articles')
  //     .then((res: I_AxiosResponse<I_Article[]>) => setArticles(res.data.answer))
  //     .catch((err: I_AxiosError) => {
  //       console.log(err)

  //       navigate(`/error${err?.status && `?code=${err.status}`}`)
  //     })
  // }, [])

  const [filterOrder, setFilterOrder] = useState<
    'latest_to_oldest' | 'oldest_to_latest' | string
  >('latest_to_oldest')

  useEffect(() => {
    if (!articles) return

    let sortedArticles = null
    if (filterOrder === 'latest_to_oldest') {
      sortedArticles = articles.sort(
        (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
      )
    } else if (filterOrder === 'oldest_to_latest') {
      sortedArticles = articles.sort(
        (a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime()
      )
    }

    setArticles(sortedArticles)
  }, [filterOrder])

  return (
    <>
      {articles?.length ? (
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-12 w-[min(1000px,_100%)]">
            {/* Filters */}
            <div className="flex flex-col gap-4 justify-between">
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-2">
                <Button variant={'outline'}>Coding</Button>
                <Button variant={'outline'}>Traveling</Button>
                <Button variant={'outline'}>Books</Button>
                <Button variant={'outline'}>Games</Button>
                <Button variant={'outline'}>Games</Button>
                <Button variant={'outline'}>Games</Button>
              </div>

              <Select defaultValue={filterOrder} onValueChange={setFilterOrder}>
                <SelectTrigger className="min-w-[200px] rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oldest_to_latest">
                    <ArrowUp />
                    Oldest to latest
                  </SelectItem>
                  <SelectItem value="latest_to_oldest">
                    <ArrowDown />
                    Latest to oldest
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-12">
              {articles.map((article, i) => {
                return (
                  <motion.div key={`${article.id}-${filterOrder}`}>
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
                    />
                  </motion.div>
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
