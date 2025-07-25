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
import type { T_FilterOrder } from '@/pages/types'
import type { I_Article, I_AxiosError, I_AxiosResponse, I_Tag } from '@/types'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Articles = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<I_Article[] | []>([])
  const [tags, setTags] = useState<string[] | []>([])
  const [currentTags, setCurrentTags] = useState<Set<string>>(new Set())
  const [filterOrder, setFilterOrder] = useState<T_FilterOrder>('asc')

  useEffect(() => {
    axios
      .get(
        `/articles?sort_by=${filterOrder}&tags=${Array.from(currentTags).join('&tags=')}`
      )
      .then((res: I_AxiosResponse<I_Article[]>) => setArticles(res.data.answer))
      .catch((err: I_AxiosError) => {
        console.log(err)

        navigate(`/error${err?.status && `?code=${err.status}`}`)
      })
  }, [filterOrder, currentTags])

  useEffect(() => {
    axios
      .get('/tags')
      .then((res: I_AxiosResponse<I_Tag[]>) =>
        setTags(res.data.answer.map(tag => tag.tagName))
      )
      .catch((err: I_AxiosError) => {
        console.log(err)

        navigate(`/error${err?.status && `?code=${err.status}`}`)
      })
  }, [])

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-12 w-[min(1000px,_100%)]">
          {/* Filters */}
          <div className="flex flex-col gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => {
                const isEnabled = currentTags.has(tag)

                return (
                  <Button
                    key={tag}
                    variant={isEnabled ? 'default' : 'outline'}
                    className="text-xs"
                    onClick={() => {
                      if (isEnabled) {
                        const temp = new Set([...currentTags])
                        temp.delete(tag)

                        setCurrentTags(temp)

                        return
                      }

                      setCurrentTags(new Set([...currentTags, tag]))
                    }}
                  >
                    {tag.toUpperCase()}
                  </Button>
                )
              })}
            </div>
            <Select
              defaultValue={filterOrder}
              onValueChange={(value: T_FilterOrder) => setFilterOrder(value)}
            >
              <SelectTrigger className="min-w-[200px] rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">
                  <ArrowUp />
                  Oldest to latest
                </SelectItem>
                <SelectItem value="desc">
                  <ArrowDown />
                  Latest to oldest
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          {articles?.length ? (
            <div className="flex flex-col gap-12">
              <AnimatePresence mode="popLayout" initial={false}>
                {articles.map((article, i) => {
                  return (
                    <motion.div
                      key={`${i}-${filterOrder}-${Array.from(currentTags).join(',')}`}
                      initial={'hidden'}
                      animate={'visible'}
                      exit={'exit'}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 10,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                        },
                        exit: {
                          opacity: 0,
                          scale: 0.95,
                          transition: {
                            duration: 0.25,
                          },
                        },
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.15, 0.55, 0.55, 1],
                        delay: Math.min(i * 0.1, 1),
                      }}
                      layout
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
                        tags={article.tags.map(tag => tag.toUpperCase())}
                      />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          ) : (
            <ArticleCardSkeleton />
          )}
        </div>
      </div>
    </>
  )
}

export default Articles
