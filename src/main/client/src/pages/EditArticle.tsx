import axios from '@/lib/axios.js'
import type { T_ArticleFormSchema } from '@/lib/schemas.js'
import ArticleForm from '@/pages/components/ArticleForm'
import type { I_Article, I_AxiosError, I_AxiosResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleFormSkeleton from './skeletons/ArticleFormSkeleton'

// const article = {
//   id: 1,
//   title: 'Generating AI videos using model',
//   subtitle: 'Useful prompts and general analysis',
//   content: `Test`,
//   updated: new Date().toString(),
//   tags: '["default", "traveling"]',
// }

const EditArticle = () => {
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

  const onSubmit = (id: number, data: T_ArticleFormSchema) => {
    axios
      .put(`/articles/${id}`, data)
      .then(() => {
        navigate(`/articles/${id}`)
        navigate(0)
      })
      .catch((err: I_AxiosError) => {
        console.log(err)

        navigate(`/error${err?.status && `?code=${err.status}`}`)
      })
  }

  useEffect(() => {
    console.log(article)
  }, [article])

  return (
    <>
      {article ? (
        <div className="flex justify-center w-full">
          <div className="w-[min(1000px,_100%)]">
            <ArticleForm
              formTitle="Edit article."
              onSubmit={data => onSubmit(article.id, data)}
              defaultValues={{
                title: article.title,
                subtitle: article.subtitle,
                content: article.content,
                tags: article.tags,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="w-[min(1000px,_100%)]">
            <ArticleFormSkeleton />
          </div>
        </div>
      )}
    </>
  )
}

export default EditArticle
