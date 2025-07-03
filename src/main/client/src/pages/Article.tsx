import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from './axios.js'
import ArticleView from './components/ArticleView.js'
import type { I_Article, I_AxiosResponse } from './types'

const Article = () => {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<I_Article | null>(null)

  useEffect(() => {
    axios
      .get(`/articles/${id}`)
      .then((res: I_AxiosResponse<I_Article | null>) =>
        setArticle(res.data.answer)
      )
      .catch(err => console.log(err))
  }, [id])

  return (
    <>
      {article ? (
        <div className="flex justify-center w-full">
          <ArticleView
            title={article.title}
            content={article.content}
            updated={new Date(article.updated).toLocaleString('en-GB', {
              timeZone: 'UTC',
            })}
          />
        </div>
      ) : (
        <span className="flex justify-center w-full">Loading...</span>
      )}
    </>
  )
}

export default Article
