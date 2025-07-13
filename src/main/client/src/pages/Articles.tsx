import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from '@/lib/axios.js'
import ArticleCard from '@/pages/components/ArticleCard'
import ArticleCardSkeleton from '@/pages/skeletons/ArticleCardSkeleton'
import type { I_Article, I_AxiosError, I_AxiosResponse } from '@/types'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

// const articlesData = [
//   {
//     id: 10,
//     title: 'Generating AI videos using model',
//     subtitle:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date('Thu Jul 10 2025 10:52:20 GMT+0000').toString(),
//     tags: ['default', 'Web DevelopmEnt', 'Spring Boot'],
//   },
//   {
//     id: 9,
//     title: 'Test2',
//     subtitle:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date('Fri Jul 11 2025 10:52:20 GMT+0000').toString(),
//     tags: ['default', 'games', 'DOcker'],
//   },
//   {
//     id: 8,
//     title: 'Test3',
//     subtitle:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date().toString(),
//     tags: ['default', 'trAveling'],
//   },
// ]

const Articles = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<I_Article[] | []>([])
  const [filterOrder, setFilterOrder] = useState<
    'latest_to_oldest' | 'oldest_to_latest' | string
  >('latest_to_oldest')
  const [loadedTags, setLoadedTags] = useState<string[] | []>([])
  const [currentTags, setCurrentTags] = useState<string[]>(['default'])

  useEffect(() => {
    axios
      .get('/articles')
      .then((res: I_AxiosResponse<I_Article[]>) => setArticles(res.data.answer))
      .catch((err: I_AxiosError) => {
        console.log(err)

        navigate(`/error${err?.status && `?code=${err.status}`}`)
      })
  }, [])

  useEffect(() => {
    let loadedTags: Set<string> = new Set<string>([])
    articles.forEach(article => {
      let tags = JSON.parse(article.tags) as string[]
      tags = [...tags]
        .filter((tag: string) => tag !== 'default')
        .map((tag: string) => tag.trim().toUpperCase())

      loadedTags = new Set([...loadedTags, ...tags])
    })

    setLoadedTags(Array.from(loadedTags))
  }, [articles])

  const articlesWrapper = (articles: ReactNode[]) => {
    return (
      <>
        {articles.length ? (
          articles
        ) : (
          <motion.div key={`${filterOrder}-${currentTags.join(',')}`}>
            <motion.div
              initial={'hidden'}
              whileInView={'visible'}
              viewport={{ once: true }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 10,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.5,
                ease: [0.15, 0.55, 0.55, 1],
                delay: 0.1,
              }}
            >
              Uhm, no, it has not been found...
            </motion.div>
          </motion.div>
        )}
      </>
    )
  }

  return (
    <>
      {articles?.length ? (
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-12 w-[min(1000px,_100%)]">
            {/* Filters */}
            <div className="flex flex-col gap-4 justify-between">
              <div className="flex flex-wrap gap-2">
                {loadedTags.map((tag, i) => {
                  const isIncluded = currentTags.includes(tag)

                  return (
                    <Button
                      variant={!isIncluded ? 'outline' : 'default'}
                      className="text-xs"
                      onClick={() => {
                        if (isIncluded) {
                          setCurrentTags([
                            ...currentTags.filter(
                              currentTag => currentTag !== tag
                            ),
                          ])
                          return
                        }

                        setCurrentTags([...currentTags, tag])
                      }}
                      key={i}
                    >
                      {tag}
                    </Button>
                  )
                })}
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
              {articlesWrapper(
                articles
                  .map(article => {
                    return {
                      ...article,
                      tags: JSON.parse(article.tags) as string[],
                    }
                  })
                  .filter(article => {
                    const parsedTags = article.tags.map(tag =>
                      tag.trim().replaceAll(' ', '').toLowerCase()
                    )

                    return currentTags.every(tag =>
                      parsedTags.includes(
                        tag.trim().replaceAll(' ', '').toLowerCase()
                      )
                    )
                  })
                  .sort((a, b) => {
                    if (filterOrder === 'latest_to_oldest') {
                      return (
                        new Date(b.updated).getTime() -
                        new Date(a.updated).getTime()
                      )
                    }

                    return (
                      new Date(a.updated).getTime() -
                      new Date(b.updated).getTime()
                    )
                  })
                  .map((article, i) => {
                    return (
                      <motion.div
                        key={`${article.id}-${filterOrder}-${currentTags.join(',')}`}
                      >
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
                          tags={article.tags}
                          i={i}
                        />
                      </motion.div>
                    )
                  })
              )}
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
