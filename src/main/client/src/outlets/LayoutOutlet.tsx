import { Link, Outlet } from 'react-router-dom'

const LayoutOutlet = () => {
  return (
    <>
      <header
        className={`
          flex justify-center items-center w-full min-h-[90px] px-8 sticky top-0 bg-background z-10 transition-all duration-500
          backdrop-blur-xl bg-background/10 border-b border-background/20 shadow-lg shadow-foreground/5 backdrop-blur-md bg-foreground/5"
        `}
      >
        <div className="flex justify-between w-[min(1000px,_100%)]">
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <a href={import.meta.env.VITE_SOURCE_URL} target="_blank">
            Source
          </a>
        </div>
      </header>
      <main className="flex-1 flex min-h-[calc(100vh_-_90px)] px-6 py-8">
        <Outlet />
      </main>
      <footer className="flex flex-col gap-6 text-background bg-foreground p-8">
        <div className="text-muted-foreground">
          Fullstack application based on Spring Boot and React
        </div>
        <div className="grid grid-cols-[repeat(2,_minmax(0,_250px))]">
          <div className="flex flex-col gap-3">
            <div className="font-semibold">Socials</div>
            <a href={import.meta.env.VITE_GITHUB_URL} target="_blank">
              Github
            </a>
            <a href={import.meta.env.VITE_TELEGRAM_URL} target="_blank">
              Telegram
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-semibold">Product</div>
            <a href={import.meta.env.VITE_LICENSE_URL} target="_blank">
              License
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LayoutOutlet
