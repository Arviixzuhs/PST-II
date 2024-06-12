import React from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { setMyUser } from '@renderer/features/userSlice'
import { Tabs, Tab } from '@nextui-org/react'
import { NavbarMain } from '@renderer/components/Navbar'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom'
import { setHospitalStats } from '@renderer/features/hospitalSlice'
import { reqGetHospitalStats } from '@renderer/api/Requests'
import { authLoadProfileByToken } from '@renderer/api/Requests'

const ProtectedRouteSession = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

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

  React.useEffect(() => {
    const loadHospitalStats = async () => {
      try {
        const response = await reqGetHospitalStats()
        dispatch(setHospitalStats(response.data))
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
    loadHospitalStats()
  })

  const handleNavigate = (path: string) => navigate(path)

  const tabs = [
    {
      title: 'Inicio',
      key: '/',
    },
    {
      title: 'Pacientes',
      key: '/patient',
    },
    {
      title: 'Personal',
      key: '/staff',
    },
    {
      title: 'Habitaciones',
      key: '/rooms',
    },
    {
      title: 'Consultas',
      key: '/consult',
    },
  ]

  return (
    <div className='mainContent'>
      <main>
        <NavbarMain />
        <div className='mainContainer'>
          <div className='flex gap-4'>
            <Sidebar />
            <div className='flex w-full flex-col select-none gap-4'>
              <Tabs
                aria-label='Options'
                color='primary'
                variant='underlined'
                selectedKey={location.pathname}
                onSelectionChange={(e) => handleNavigate(`${e}`)}
              >
                {tabs.map((item) => (
                  <Tab key={item.key} title={item.title} className='pb-0' />
                ))}
              </Tabs>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProtectedRouteSession
