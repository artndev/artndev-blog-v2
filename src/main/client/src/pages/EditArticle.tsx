import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from './axios.js'
import type { I_Article, I_AxiosResponse } from './types'
import ArticleForm from './components/ArticleForm'
import type { T_ArticleFormSchema } from '@/lib/schemas.js'

// const article = {
//   id: 1,
//   title: 'Generating AI videos using model',
//   subtitle: 'Useful prompts and general analysis',
//   content: `
//   # Test
//   ## Test
//   ### Test
//   #### Test
//   ##### Test
//   ###### Test
//   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?
//   \n
//   ![Test](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDMGheeUg2Ze_DzqNcamrV1aCW37jHSj2Vpw&s)
//   \n
//   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?
//   \n
//   <hr/>
//   <h3>Test</h3>
//   <img width=120 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDMGheeUg2Ze_DzqNcamrV1aCW37jHSj2Vpw&s" />
//   <p>Some text! Yay!</p>
//   <blockquote>Blockquote</blockquote>
//   <s>Test</s>
//   <code>
//     console.log("Hey")
//   </code>
//   `,
//   updated: new Date().toString(),
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
      .catch(err => console.log(err))
  }, [id])

  const onSubmit = (id: number, data: T_ArticleFormSchema) => {
    axios
      .put(`/articles/${id}`, data)
      .then(() => {
        navigate(`/articles/${id}`)
        navigate(0)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {article ? (
        <div className="flex justify-center items-center w-full">
          <ArticleForm
            formTitle="Edit article."
            onSubmit={data => onSubmit(article.id, data)}
            defaultValues={{
              title: article.title,
              subtitle: article.subtitle,
              content: article.content,
            }}
          />
        </div>
      ) : (
        <span className="flex justify-center w-full">Loading...</span>
      )}
    </>
  )
}

export default EditArticle
