import { ChangeTheme } from '../Theme'
import { Notification } from '../Notification'
import { GradientTitle } from '../GradientTitle'
import { NavbarUserOptions } from './NavbarUserOptions'
import './Navbar.scss'

export const NavbarMain = () => {
  return (
    <nav className='navbarContainer'>
      <GradientTitle title={'VITALCARE'} />
      <div className='flex gap-4 items-center'>
        <ChangeTheme />
        <Notification />
        <NavbarUserOptions />
      </div>
    </nav>
  )
}
