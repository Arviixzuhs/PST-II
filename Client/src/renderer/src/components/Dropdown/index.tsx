import {
  cn,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from '@nextui-org/react'
import { VerticalDotsIcon } from '../TableUser/VerticalDotsIcon'
import { EditDocumentIcon } from './EditDocumentIcon'
import { DeleteDocumentIcon } from './DeleteDocumentIcon'

export const ActionDropdown = ({ deleteAction, editAction }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size='sm' variant='light'>
          <VerticalDotsIcon className='text-default-300' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
        <DropdownItem
          key='edit'
          onPress={editAction}
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key='delete'
          className='text-danger'
          color='danger'
          onPress={deleteAction}
          startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}
        >
          Borrar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
