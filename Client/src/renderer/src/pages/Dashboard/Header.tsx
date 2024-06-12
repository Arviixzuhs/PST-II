import { FaBed } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { FaUserShield } from 'react-icons/fa'
import { Card, CardBody } from '@nextui-org/react'
import './Dashboard.scss'

export const DashboardHeader = () => {
  const hospitalData = useSelector((state: any) => state.hospital)

  const cards = [
    {
      title: 'Pacientes',
      value: hospitalData?.patients,
      icon: <FaUsers />,
    },
    {
      title: 'Personal',
      value: hospitalData?.clinicalStaffs,
      icon: <FaUserShield />,
    },
    {
      title: 'Habitaciones',
      value: hospitalData?.rooms,
      icon: <FaBed />,
    },
    {
      title: 'Consultas',
      value: hospitalData?.consults,
      icon: <FaCalendar />,
    },
  ]

  return (
    <div className='flex gap-4'>
      {cards.map((item, index) => (
        <Card className='w-full' key={index}>
          <CardBody>
            <span className='dashboardIcon'>{item.icon}</span>
            <div className='flex flex-col '>
              <h3 className='font-medium'>{item.title}</h3>
              <span className='text-small text-default-500'>{item.value}</span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
