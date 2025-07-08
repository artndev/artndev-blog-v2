import ArrowButton from '@/components/custom/arrow-button'
import ErrorGif from '@/pages/imgs/error.gif'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  const [query] = useSearchParams()

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[min(500px,_100%)]">
        <div className="flex flex-col gap-4 w-full">
          <a
            href="https://x.com/Oz_yarimasu/status/1847214287275934123"
            target="_blank"
            className="w-[max-content] text-sm"
          >
            Credits to @Oz_yarimasu
          </a>
          <div className="flex justify-center items-center w-full rounded-sm overflow-hidden relative">
            <img src={ErrorGif} alt="gif" className="w-full object-cover" />
            <div className="bg-foreground w-full h-full opacity-50 absolute" />
            <div className="text-5xl text-background font-semibold jetbrains-mono leading-none absolute">
              {query.get('code') ?? '418'}
            </div>
          </div>
          <span>
            You have caught an error with the provided status code. Do not worry
            as it will be fixed soon!
          </span>
          <ArrowButton
            content={'Return to articles'}
            direction="left"
            onClick={() => navigate('/articles')}
          />
        </div>
      </div>
    </div>
  )
}

export default Error
