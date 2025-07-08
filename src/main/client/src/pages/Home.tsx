import MagneticButton from '@/components/bundui/magnetic-button'
import { TextAnimate } from '@/components/magicui/text-animate'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col gap-6">
        <div className="text-5xl font-semibold hanken-grotesk leading-none">
          <TextAnimate animation={'blurIn'} duration={1}>
            Explore stunning ideas.
          </TextAnimate>
        </div>
        <MagneticButton className="max-w-[200px] rounded-full transition-shadow duration-250">
          <Button
            className="w-full rounded-full"
            onClick={() => navigate('/articles')}
          >
            Dive into articles
            <ArrowUpRight />
          </Button>
        </MagneticButton>
      </div>
    </div>
  )
}

export default Home
