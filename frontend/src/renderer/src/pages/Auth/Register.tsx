import React from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { reqAuthRegister } from '@renderer/api/Requests'
import BackgroundImage from '../../assets/img/background.gif'
import './Auth.scss'

export const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: '',
    lastName: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    reqAuthRegister(data)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          toast.error(error.response.data.errors[0]?.messages[0])
        }

        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        }
      })
  }

  const inputs = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Ingresa tu correo',
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      placeholder: 'Ingresa tu nombre',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Apellido',
      placeholder: 'Ingresa tu apellido',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Ingresa la contraceña para tu cuenta',
    },
  ]

  return (
    <form onSubmit={handleRegister}>
      <div className='authContainer'>
        <div className='authFormLeft'>
          <div className='authFormContainer'>
            <div>
              <h3>
                <span className='degradezPalabra'>Registrarme</span>
              </h3>
              <div className='authForm'>
                {inputs.map((item, index) => (
                  <Input
                    key={index}
                    type={item.type}
                    name={item.name}
                    label={item.label}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                  />
                ))}
              </div>
              <button className='loginButton' type='submit'>
                Registrarme
              </button>
              <p className='authFormMessage'>
                ¿Ya estas registrado en la plataforma?
                <span>
                  <Link to='/login'> Inicia sesión</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='authFormimageRight'>
          <img src={BackgroundImage} />
        </div>
      </div>
    </form>
  )
}
