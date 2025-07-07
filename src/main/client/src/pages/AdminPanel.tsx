import ButtonArrow from '@/components/custom/button-arrow'
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
import axios from '@/lib/axios.js'
import AdminPanelSkeleton from '@/pages/skeletons/AdminPanelSkeleton'
import type { I_Article, I_AxiosResponse } from '@/types'
import { Link, Pen, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      .then((res: I_AxiosResponse<I_Article[]>) => setArticles(res.data.answer))
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
          <div className="w-[min(1000px,_100%)]">
            <div className="flex flex-col gap-12">
              <div className="flex justify-between gap-3">
                <ButtonArrow
                  direction="left"
                  content="Back to articles"
                  onClick={() => navigate('/articles')}
                />
                <ButtonArrow
                  direction="right"
                  directionNode={
                    <Plus className="icon transition-transform duration-250" />
                  }
                  content="Add article"
                  onClick={() => navigate('/admin-panel/articles/add')}
                />
              </div>
              {articles.map((article, i) => {
                return (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="text-2xl font-semibold hanken-grotesk">
                      {article.title}
                    </div>
                    <hr />
                    <div className="flex gap-3">
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
                              <Button
                                variant="outline"
                                className="min-w-[100px]"
                              >
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
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="w-[min(1000px,_100%)]">
            <AdminPanelSkeleton />
          </div>
        </div>
      )}
    </>
  )
}

export default AdminPanel
