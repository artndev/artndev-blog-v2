// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from './axios.js'
// import type { I_Article, I_AxiosResponse } from './types'
import ArticleView from './components/ArticleView.js'

const article = {
  id: 1,
  title: 'Generating AI videos using model',
  subtitle: 'Useful prompts and general analysis',
  content: `
  # Test
  ## Test
  ### Test
  #### Test
  ##### Test
  ###### Test
  ![Test](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDMGheeUg2Ze_DzqNcamrV1aCW37jHSj2Vpw&s)
  `,
  updated: new Date().toString(),
}

const Article = () => {
  // const { id } = useParams<{ id: string }>()
  // const [article, setArticle] = useState<I_Article | null>(null)

  // useEffect(() => {
  //   axios
  //     .get(`/articles/${id}`)
  //     .then((res: I_AxiosResponse<I_Article | null>) =>
  //       setArticle(res.data.answer)
  //     )
  //     .catch(err => console.log(err))
  // }, [id])

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
              })}
            />
          </div>
        </div>
      ) : (
        <span className="flex justify-center w-full">Loading...</span>
      )}
    </>
  )
}

export default Article
