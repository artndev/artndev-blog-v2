import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col gap-6">
        <div className="text-4xl font-semibold hanken-grotesk">
          Explore <span className="jetbrains-mono">stunning</span> ideas.
        </div>
        <Button
          className="max-w-[200px] rounded-full cursor-pointer"
          onClick={() => navigate('/articles')}
        >
          Dive into articles
          <ArrowUpRight />
        </Button>
      </div>
    </div>
  )
}

export default Home
