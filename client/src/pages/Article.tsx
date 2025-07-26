import axios from '@/lib/axios.js'
import ArticleView from '@/pages/components/ArticleView'
import ArticleViewSkeleton from '@/pages/skeletons/ArticleViewSkeleton'
import type { I_Article, I_AxiosError, I_AxiosResponse } from '@/types'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Article = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<I_Article | null>(null)

  useEffect(() => {
    axios
      .get(`/articles/${id}`)
      .then((res: I_AxiosResponse<I_Article | null>) =>
        setArticle(res.data.answer)
      )
      .catch((err: I_AxiosError) => {
        console.log(err)

        navigate(`/error${err?.status && `?code=${err.status}`}`)
      })
  }, [id])

  return (
    <>
      {article ? (
        <div className="flex justify-center w-full">
          <div className="w-[min(1000px,_100%)]">
            <motion.div
              className="w-full h-full"
              initial={'hidden'}
              animate={'visible'}
              variants={{
                hidden: {
                  opacity: 0,
                  x: -10,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              transition={{
                duration: 0.5,
                ease: [0.15, 0.55, 0.55, 1],
              }}
            >
              <ArticleView
                id={article.id}
                title={article.title}
                content={article.content}
                updated={new Date(article.updated).toLocaleDateString('en-GB', {
                  timeZone: 'UTC',
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
                tags={article.tags.map(tag => tag.toUpperCase())}
              />
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="w-[min(1000px,_100%)]">
            <ArticleViewSkeleton />
          </div>
        </div>
      )}
    </>
  )
}

export default Article
