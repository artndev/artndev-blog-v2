import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import IsAdmin from './outlets/IsAdmin'
import AdminPanel from './pages/AdminPanel'
import Article from './pages/Article'
import Articles from './pages/Articles'
import ArticleForm from './pages/components/ArticleForm'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

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

            <Route
              path="/admin/articles/:id/edit"
              element={<ArticleForm onSubmit={() => {}} />}
            />
            <Route
              path="/admin/articles/add"
              element={<ArticleForm onSubmit={() => {}} />}
            />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
