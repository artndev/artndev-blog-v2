import AdminOutlet from '@/outlets/AdminOutlet'
import LayoutOutlet from '@/outlets/LayoutOutlet'
import AddArticle from '@/pages/AddArticle'
import AdminPanel from '@/pages/AdminPanel'
import Article from '@/pages/Article'
import Articles from '@/pages/Articles'
import EditArticle from '@/pages/EditArticle'
import Error from '@/pages/Error'
import Home from '@/pages/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ScrollOutlet from './outlets/ScrollOutlet'

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<ScrollOutlet />}>
          <Route element={<LayoutOutlet />}>
            <Route index element={<Home />} />

            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<Article />} />

            <Route path="/admin-panel" element={<AdminOutlet />}>
              <Route index element={<AdminPanel />} />

              <Route
                path="/admin-panel/articles/:id/edit"
                element={<EditArticle />}
              />
              <Route
                path="/admin-panel/articles/add"
                element={<AddArticle />}
              />
            </Route>

            <Route path="/error" element={<Error />} />
            <Route path="/*" element={<Navigate to="/error?code=404" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
