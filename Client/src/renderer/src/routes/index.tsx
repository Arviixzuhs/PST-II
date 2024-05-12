import { Login } from '@renderer/pages/Auth/Login'
import { TabsNav } from '@renderer/pages/Main'
import { Register } from '@renderer/pages/Auth/Register'
import { Route, Routes } from 'react-router-dom'
import ProtectedRouteAuth from './middlewares/ProtectedRouteAuth'
import ProtectedRouteSession from './middlewares/ProtectedRouteSession'

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRouteSession />}>
        <Route path='/' element={<TabsNav />} />
      </Route>
      <Route element={<ProtectedRouteAuth />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Router
