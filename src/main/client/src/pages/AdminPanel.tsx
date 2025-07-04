// import { useEffect, useState } from 'react'
// import axios from './axios.js'
// import type { I_Article, I_AxiosResponse } from './types'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2, Pen, Link } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const articles = [
  {
    id: 1,
    title: 'Generating AI videos using model',
    subtitle: 'Useful prompts and general analysis',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    updated: new Date().toString(),
  },
  {
    id: 2,
    title: 'Test2',
    subtitle: 'Test2',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    updated: new Date().toString(),
  },
  {
    id: 3,
    title: 'Test3',
    subtitle: 'Test3',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
    updated: new Date().toString(),
  },
]

const AdminPanel = () => {
  const navigate = useNavigate()
  // const [articles, setArticles] = useState<I_Article[] | null>(null)

  // useEffect(() => {
  //   axios
  //     .get('/articles')
  //     .then((res: I_AxiosResponse<I_Article[] | null>) =>
  //       setArticles(res.data.answer)
  //     )
  //     .catch(err => console.log(err))
  // }, [])

  return (
    <>
      {articles?.length ? (
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-8 w-[min(1000px,_100%)]">
            <Button
              variant={'outline'}
              className="self-end w-[200px] rounded-full"
              onClick={() => navigate('/articles')}
            >
              Back to articles
            </Button>
            {articles.map((article, i) => {
              return (
                <div key={i} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 text-2xl font-semibold hanken-grotesk">
                    {article.title}
                    <Badge className="h-[max-content]">ID: {article.id}</Badge>
                  </div>
                  <div className="flex gap-3 w-full">
                    <Button className="min-w-[100px] rounded-full">
                      <Pen />
                      Edit
                    </Button>
                    <Button
                      className="min-w-[100px] rounded-full"
                      onClick={() => navigate(`/articles/${article.id}`)}
                    >
                      <Link />
                      View
                    </Button>
                    <Button
                      variant={'destructive'}
                      className="min-w-[100px] rounded-full ml-auto"
                    >
                      <Trash2 />
                      Delete
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <span className="flex justify-center w-full">Loading...</span>
      )}
    </>
  )
}

export default AdminPanel
