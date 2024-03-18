import React from 'react'
import { setMyUser } from '@renderer/features/userSlice'
import { NavbarMain } from '@renderer/components/Navbar'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { authLoadProfileByToken } from '@renderer/api/Requests'

const ProtectedRouteSession = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  if (!token) return <Navigate to='/login' />

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        if (token) {
          const response = await authLoadProfileByToken(token)
          dispatch(setMyUser(response.data))
        }
      } catch (error) {
        localStorage.removeItem('token')
        console.log(error)
      }
    }
    loadProfile()
  }, [token])

  return (
    <div className='mainContent'>
      <main>
        <NavbarMain />
        <div className='mainContainer'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default ProtectedRouteSession
