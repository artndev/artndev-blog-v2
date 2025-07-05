import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ArrowLeft, Link, Pen, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './axios.js'
import type { I_Article, I_AxiosResponse } from './types'

// const articles = [
//   {
//     id: 1,
//     title: 'Generating AI videos using model',
//     subtitle: 'Useful prompts and general analysis',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date().toString(),
//   },
//   {
//     id: 2,
//     title: 'Test2',
//     subtitle: 'Test2',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date().toString(),
//   },
//   {
//     id: 3,
//     title: 'Test3',
//     subtitle: 'Test3',
//     content:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?',
//     updated: new Date().toString(),
//   },
// ]

const AdminPanel = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<I_Article[] | null>(null)

  useEffect(() => {
    axios
      .get('/articles')
      .then((res: I_AxiosResponse<I_Article[] | null>) =>
        setArticles(res.data.answer)
      )
      .catch(err => console.log(err))
  }, [])

  const onClick = (id: number) => {
    axios
      .delete(`/articles/${id}`)
      .then(() => navigate(0))
      .catch(err => console.log(err))
  }

  return (
    <>
      {articles?.length ? (
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-12 w-[min(1000px,_100%)]">
            <div className="flex justify-end gap-6 w-full">
              <Button
                variant={'outline'}
                className="flex-1 max-w-[200px] rounded-full"
                onClick={() => navigate('/articles')}
              >
                <ArrowLeft />
                Back to articles
              </Button>
              <Button
                className="flex-1 max-w-[200px] rounded-full"
                onClick={() => navigate('/admin-panel/articles/add')}
              >
                Add article
                <Plus />
              </Button>
            </div>
            {articles.map((article, i) => {
              return (
                <div key={i} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 text-2xl font-semibold hanken-grotesk">
                    {article.title}
                    <Badge variant={'outline'} className="h-[max-content]">
                      ID: {article.id}
                    </Badge>
                  </div>
                  <div className="flex gap-3 w-full">
                    <Button
                      className="min-w-[100px] rounded-full"
                      onClick={() =>
                        navigate(`/admin-panel/articles/${article.id}/edit`)
                      }
                    >
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={'destructive'}
                          className="min-w-[100px] rounded-full ml-auto"
                        >
                          <Trash2 />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="flex flex-col gap-6 sm:max-w-md">
                        <DialogHeader className="flex flex-col gap-3">
                          <DialogTitle className="text-2xl!">
                            Are you sure?
                          </DialogTitle>
                          <DialogDescription>
                            This action will permanently be executed with no
                            chance of recovery
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" className="min-w-[100px]">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            className="min-w-[100px]"
                            onClick={() => onClick(article.id)}
                          >
                            Yes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
