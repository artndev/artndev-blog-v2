import axios from '@/lib/axios.js'
import type { T_ArticleFormSchema } from '@/lib/schemas.js'
import ArticleForm from '@/pages/components/ArticleForm'
import type { I_AxiosError } from '@/types'
import { useNavigate } from 'react-router-dom'

const AddArticle = () => {
  const navigate = useNavigate()

  const onSubmit = (data: T_ArticleFormSchema) => {
    axios
      .post('/articles', data, {
        headers: {
          Authorization: `Basic ${btoa(`${import.meta.env.VITE_ADMIN_USERNAME}:${import.meta.env.VITE_ADMIN_PASSWORD}`)}`,
        },
      })
      .then(() => {
        navigate('/articles')
        navigate(0)
      })
      .catch((err: I_AxiosError) => {
        console.log(err)

        navigate(`/error${err?.status && `?code=${err.status}`}`)
      })
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-[min(1000px,_100%)]">
        <ArticleForm formTitle="Add article." onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default AddArticle
