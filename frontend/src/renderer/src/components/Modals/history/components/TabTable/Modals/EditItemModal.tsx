import React from 'react'
import {
  Input,
  Modal,
  Button,
  Select,
  Textarea,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import { useModal } from '@renderer/hooks/useModal'
import { RootState } from '@renderer/store'
import { ModalProps } from '@renderer/components/TableUser/interfaces/TableProps'
import { modalTypes } from '@renderer/hooks/useModal'
import { setCurrentEditItemId } from '@renderer/features/tablePerTabSlice'
import { useDispatch, useSelector } from 'react-redux'

export const EditItemModal = ({ modal }: { modal: ModalProps }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
  const table = useSelector((state: RootState) => state.tablePerTab)
  const [isOpen, toggleModal] = useModal(modalTypes.editItemTableTabModal)

  const currentItemEdit = table.data[table.currentTab].find(
    (item) => item.id == table.currentItemIdEdit,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name
    const value = e.target.value
    const intValues = ['age']

    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentEditItemId(-1))

  const onSubmit = async () => {
    modal.action(data, currentItemEdit)
    handleResetCurrentIdEdit()
    toggleModal()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        onOpenChange={toggleModal}
        scrollBehavior={'inside'}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal.title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-col gap-4'>
              {modal?.inputs?.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  required={true}
                  onChange={handleChange}
                  defaultValue={currentItemEdit && currentItemEdit[input.name]}
                />
              ))}
            </div>
            <div className='flex w-full flex-col gap-4'>
              {modal?.selectInputs?.map((item, index) => (
                <Select
                  key={index}
                  name={item.name}
                  label={item.label}
                  onChange={handleChange}
                  className='max-w-x default-text-color'
                  defaultSelectedKeys={[currentItemEdit && currentItemEdit[item.name]]}
                >
                  {item.options.map((state) => (
                    <SelectItem
                      key={state.value}
                      value={state.value}
                      className='default-text-color'
                    >
                      {state.label}
                    </SelectItem>
                  ))}
                </Select>
              ))}
            </div>
            <div className='flex w-full flex-col gap-4'>
              {modal?.textArea?.map((item, index: number) => (
                <Textarea
                  key={index}
                  name={item.name}
                  label={item.label}
                  onChange={handleChange}
                  className='default-text-color'
                  labelPlacement='outside'
                  defaultValue={currentItemEdit && currentItemEdit[item.name]}
                  placeholder={item.placeholder}
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
                toggleModal()
              }}
            >
              Cerrar
            </Button>
            <Button color='primary' onPress={() => onSubmit()}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
