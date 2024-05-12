import React from 'react'
import { setUsers } from '../../features/usersSlice'
import { TopContent } from './TopContent'
import { RenderCell } from './RenderCell'
import { BottomContent } from './BottomContent'
import { reqLoadAllPatients } from '@renderer/api/Requests'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Selection,
  TableHeader,
  TableColumn,
  SortDescriptor,
} from '@nextui-org/react'
import { reqDeletePatient } from '@renderer/api/Requests'
import { deleteUser, setCurrentEditUserId } from '../../features/usersSlice'
import { columns, statusOptions, InitialVisibleColumns } from './data'

export const AppTable = ({ managePatientButtonModal }) => {
  const dispatch = useDispatch()
  type User = (typeof users)[0]
  const users = useSelector((state: any) => state.users.data)

  React.useEffect(() => {
    const loadAllPatients = async () => {
      const response = await reqLoadAllPatients()
      dispatch(setUsers(response.data))
    }
    loadAllPatients()
  }, [])

  const [page, setPage] = React.useState(1)
  const [filterValue, setFilterValue] = React.useState('')
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(InitialVisibleColumns),
  )
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  })

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const hasSearchFilter = Boolean(filterValue)
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) => Array.from(statusFilter).includes(user.status))
    }

    return filteredUsers
  }, [users, filterValue, statusFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number
      const second = b[sortDescriptor.column as keyof User] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const handleDeleteUser = async (id: any) => {
    try {
      dispatch(deleteUser(id))
      await reqDeletePatient(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetCurrentIdEdit = (id: any) => {
    dispatch(setCurrentEditUserId(id))
  }

  return (
    <>
      <Table
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
        bottomContent={
          <BottomContent
            page={page}
            pages={pages}
            setPage={setPage}
            selectedKeys={selectedKeys}
            filteredItems={filteredItems}
          />
        }
        bottomContentPlacement='outside'
        selectedKeys={selectedKeys}
        selectionMode='multiple'
        sortDescriptor={sortDescriptor}
        topContent={
          <TopContent
            setPage={setPage}
            filterValue={filterValue}
            statusFilter={statusFilter}
            visibleColumns={visibleColumns}
            setRowsPerPage={setRowsPerPage}
            setFilterValue={setFilterValue}
            setStatusFilter={setStatusFilter}
            setVisibleColumns={setVisibleColumns}
            managePatientButtonModal={managePatientButtonModal}
          />
        }
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No hay pacientes registrados'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {RenderCell(item, columnKey, handleDeleteUser, handleSetCurrentIdEdit)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
