import axios from '@/lib/axios.js'
import type { T_ArticleFormSchema } from '@/lib/schemas.js'
import ArticleForm from '@/pages/components/ArticleForm'
import { useNavigate } from 'react-router-dom'

const AddArticle = () => {
  const navigate = useNavigate()

  const onSubmit = (data: T_ArticleFormSchema) => {
    axios
      .post('/articles', data)
      .then(() => {
        navigate('/articles')
        navigate(0)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="flex justify-center items-center w-full">
      <ArticleForm formTitle="Add article." onSubmit={onSubmit} />
    </div>
  )
}

export default AddArticle
