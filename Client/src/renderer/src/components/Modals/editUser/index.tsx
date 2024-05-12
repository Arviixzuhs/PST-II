import {
  Input,
  Modal,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import toast from 'react-hot-toast'
import React from 'react'
import { inputs, selectInputs } from '../Inputs'
import { reqEditPatient } from '@renderer/api/Requests'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, setCurrentEditUserId } from '../../../features/usersSlice'

export const EditUserProfileModal = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users.data)
  const currentUserIdEdit = useSelector((state: any) => state.users.currentUserIdEdit)
  const currentUserEdit = users.find((item: { id: any }) => item.id == currentUserIdEdit)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    if (currentUserIdEdit !== -1) onOpen()
  }, [currentUserIdEdit])

  const handleChange = (e: any) => {
    let name = e.target.name
    let value = e.target.value
    let intValues = ['age']

    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentEditUserId(-1))

  const handleAddNewUser = async () => {
    try {
      dispatch(editUser({ data, id: currentUserEdit?.id }))
      await reqEditPatient({
        data,
        id: currentUserEdit?.id,
      })
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
                  required={true}
                  onChange={(e) => handleChange(e)}
                  defaultValue={currentUserEdit && currentUserEdit[input.name]}
                />
              ))}
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              {selectInputs.map((item, index) => (
                <Select
                  key={index}
                  name={item.name}
                  label='Estado del pasiente'
                  className='max-w-x'
                  onChange={(e) => handleChange(e)}
                  defaultSelectedKeys={[currentUserEdit && currentUserEdit[item.name]]}
                >
                  {item.options.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </Select>
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
