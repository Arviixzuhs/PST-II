import { ActionDropdown } from '../Dropdown'
import { Chip, ChipProps, User } from '@nextui-org/react'

export const RenderCell = (
  user: any,
  columnKey: any,
  handleDeleteUser: any,
  handleSetCurrentIdEdit: any,
) => {
  const statusColorMap: Record<string, ChipProps['color']> = {
    ALIVE: 'success',
    DEAD: 'danger',
  }

  const cellValue = user[columnKey]

  switch (columnKey) {
    case 'name':
      return (
        <User avatarProps={{ src: user.avatar }} description={user.email} name={cellValue}>
          {user.email}
        </User>
      )
    case 'status':
      return (
        <Chip className='capitalize' color={statusColorMap[user.status]} size='sm' variant='flat'>
          {cellValue}
        </Chip>
      )
    case 'actions':
      return (
        <div className='relative flex justify-end items-center gap-2'>
          <ActionDropdown
            editAction={() => handleSetCurrentIdEdit(user.id)}
            deleteAction={() => handleDeleteUser(user.id)}
          />
        </div>
      )
    default:
      return cellValue
  }
}
