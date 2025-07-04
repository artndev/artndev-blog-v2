import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header className="flex justify-center w-full p-[40px] sticky top-0 bg-(--background) shadow-sm">
        <div className="flex justify-between w-[min(1000px,_100%)] ">
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="#">Source</Link>
        </div>
      </header>
      <main className="flex-1 flex p-[40px_20px_40px_20px]">
        <Outlet />
      </main>
      <footer className="flex flex-col gap-6 text-(--background) bg-(--foreground) p-[40px] shadow-sm">
        <span className="text-(--muted-foreground)">
          Fullstack application based on Spring Boot and React
        </span>
        <div className="grid grid-cols-[repeat(2,_minmax(0,_250px))] gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-semibold">Socials</span>
            <Link to="#">Github</Link>
            <Link to="#">Telegram</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold">Product</span>
            <Link to="#">License</Link>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
