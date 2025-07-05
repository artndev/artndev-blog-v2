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
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?
  \n
  ![Test](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDMGheeUg2Ze_DzqNcamrV1aCW37jHSj2Vpw&s)
  \n
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?
  \n
  <h3>Test</h3>
  <img width=100 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDMGheeUg2Ze_DzqNcamrV1aCW37jHSj2Vpw&s" />
  <p>Some text! Yay!</p>
  <blockquote>Test</blockquote>
  <s>Test</s>
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
