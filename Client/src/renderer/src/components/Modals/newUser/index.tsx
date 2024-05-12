import React from 'react'
import toast from 'react-hot-toast'
import { addUser } from '../../../features/usersSlice'
import { PlusIcon } from '../../TableUser/PlusIcon'
import { useDispatch } from 'react-redux'
import { reqAddPatient } from '@renderer/api/Requests'
import { inputs, selectInputs } from '../Inputs'
import {
  Modal,
  Input,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'

export const CreateNewUserModal = () => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState<any>({})
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddNewUser = async () => {
    try {
      const response = await reqAddPatient({ ...data, age: parseInt(data.age) })
      dispatch(addUser(response.data))
      onClose()
      toast.success('Paciente guardado correctamente')
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        Agregar paciente
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'} backdrop='blur'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Agrega a un nuevo paciente</ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              {inputs.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  onChange={(e) => handleChange(e)}
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
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
