import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header className="flex justify-between self-center w-full max-w-[1000px] p-[40px]">
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
        <Link to="#">Source</Link>
      </header>
      <section className="flex-1 flex flex-col">
        <main className="flex-1 flex justify-center p-[0_20px_40px_20px]">
          <Outlet />
        </main>
        <footer className="flex flex-col gap-6 text-(--background) bg-(--foreground) p-[40px]">
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
      </section>
    </>
  )
}

export default Layout
