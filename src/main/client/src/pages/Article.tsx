import axios from '@/lib/axios.js'
import ArticleView from '@/pages/components/ArticleView'
import ArticleViewSkeleton from '@/pages/skeletons/ArticleViewSkeleton'
import type { I_Article, I_AxiosError, I_AxiosResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
            />
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
