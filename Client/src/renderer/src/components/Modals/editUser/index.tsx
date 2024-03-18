import {
  Input,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import toast from 'react-hot-toast'
import React from 'react'
import { inputs } from '../Inputs'
import { reqEditPatient } from '@renderer/api/Requests'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, setCurrentEditUserId } from '../../../features/usersSlice'

export const EditUserProfileModal = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users.data)
  const currentUserIdEdit = useSelector((state: any) => state.users.currentUserIdEdit)
  const currentUserEdit = users.find((item: { id: any }) => item.id == currentUserIdEdit)
  const [data, setData] = React.useState({
    ...currentUserIdEdit,
    age: parseInt(currentUserIdEdit.age),
  })
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  React.useEffect(() => {
    if (currentUserIdEdit !== -1) {
      onOpen()
    }
  }, [currentUserIdEdit])

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleResetCurrentIdEdit = () => {
    dispatch(setCurrentEditUserId(-1))
  }

  const handleAddNewUser = async () => {
    try {
      dispatch(editUser({ data: data, id: currentUserEdit?.id }))
      const response = await reqEditPatient({
        data: { ...data, age: parseInt(data.age) },
        id: currentUserEdit?.id,
      })
      console.log(response.data)
      toast.success('Paciente editado correctamente')
      handleResetCurrentIdEdit()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        backdrop='blur'
        onClose={handleResetCurrentIdEdit}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Editar paciente</ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              {inputs.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  defaultValue={currentUserEdit && currentUserEdit[input.name]}
                  onChange={(e) => handleChange(e)}
                />
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              variant='light'
              onPress={() => {
                handleResetCurrentIdEdit()
                onClose()
              }}
            >
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
