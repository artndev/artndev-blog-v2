import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

const ScrollOutlet = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) return

    setTimeout(
      () => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }),
      100
    )
  }, [location])

  return <Outlet />
}

export default ScrollOutlet
