import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Article from './pages/Article'
import Articles from './pages/Articles'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import IsAdmin from './outlets/IsAdmin'
import AdminPanel from './pages/AdminPanel'

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<Article />} />

          <Route path="/admin" element={<IsAdmin />}>
            <Route index element={<AdminPanel />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
