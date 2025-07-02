import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="self-center flex flex-col gap-6">
      <div className="text-5xl font-semibold hanken-grotesk">
        Explore <span className="jetbrains-mono">stunning</span> ideas.
      </div>
      <Button
        className="w-[200px] rounded-full cursor-pointer"
        onClick={() => navigate('/articles')}
      >
        Dive into my articles
      </Button>
    </div>
  )
}

export default Home
