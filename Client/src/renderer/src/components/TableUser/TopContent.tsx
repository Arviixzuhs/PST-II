import {
  Input,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { SearchIcon } from './SearchIcon'
import { capitalize } from './utils'
import { useSelector } from 'react-redux'
import { ChevronDownIcon } from './ChevronDownIcon'
import { EditUserProfileModal } from '../Modals/editUser'
import { columns, statusOptions } from './data'

export const TopContent = ({
  setPage,
  filterValue,
  statusFilter,
  visibleColumns,
  setRowsPerPage,
  setFilterValue,
  setStatusFilter,
  setVisibleColumns,
  managePatientButtonModal,
}) => {
  const users = useSelector((state: any) => state.users.data)
  const onRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(1)
  }

  const onSearchChange = (value) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }

  const onClear = () => {
    setFilterValue('')
    setPage(1)
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Buscar por nombre...'
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='sm:flex'>
                <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode='multiple'
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className='capitalize'>
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className='sm:flex'>
                <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {managePatientButtonModal}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>{users.length} pacientes en total</span>
          <label className='flex items-center text-default-400 text-small'>
            Pacientes por página:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
      <EditUserProfileModal />
    </>
  )
}
