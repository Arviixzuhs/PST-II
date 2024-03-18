import { GradientTitle } from '../GradientTitle'
import { NavbarUserOptions } from './NavbarUserOptions'
import './Navbar.scss'

export const NavbarMain = () => {
  return (
    <nav className='navbarContainer'>
      <GradientTitle title={'VITALCARE'} />
      <NavbarUserOptions />
    </nav>
  )
}
