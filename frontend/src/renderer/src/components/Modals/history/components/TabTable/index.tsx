import { Consult } from '@renderer/interfaces/consultModel'
import { NoteModel } from '@renderer/interfaces/noteModel'
import { RootState } from '@renderer/store'
import { EmptyContent } from '@renderer/components/TableUser/components/EmptyContent'
import { ActionDropdown } from '@renderer/components/Dropdown'
import { DiagnosticModel } from '@renderer/interfaces/diagnosticModel'
import { modalTypes, useModal } from '@renderer/hooks/useModal'
import { setCurrentEditItemId } from '@renderer/features/tablePerTabSlice'
import { newParseDateWithTime } from '@renderer/utils/newParseDate'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'

interface TableActions {
  edit: (data: unknown) => void
  delete: (id: number) => void
  create: (data: unknown) => void
}

interface TableProps {
  addItemModal?: React.ReactElement
  tableActions?: TableActions
  editItemModal?: React.ReactElement
}

interface RenderCellProps {
  row: DiagnosticModel | NoteModel | Consult
  column: string
  itemId: number
}

export const TabTable: React.FC<TableProps> = ({ addItemModal, editItemModal, tableActions }) => {
  const table = useSelector((state: RootState) => state.tablePerTab)
  const [_, toggleModal] = useModal(modalTypes.editItemTableTabModal)
  const dispatch = useDispatch()

  const RenderCell: React.FC<RenderCellProps> = ({ row, column, itemId }) => {
    const cellValue = row[column]
    const parsedDate = newParseDateWithTime({ date: cellValue })

    switch (column) {
      case 'patient':
      case 'doctor':
        return (
          <h3>
            {cellValue?.name} {cellValue?.lastName}
          </h3>
        )

      case 'createdAt':
      case 'date':
        return (
          <span>
            {parsedDate.date} a las {parsedDate.time}
          </span>
        )

      case 'actions':
        return (
          <ActionDropdown
            editAction={() => {
              dispatch(setCurrentEditItemId(itemId))
              toggleModal()
            }}
            deleteAction={() => tableActions?.delete(itemId)}
          />
        )

      default:
        return cellValue
    }
  }

  if (!table || table.columns.length === 0 || !table.data[table.currentTab]) {
    return <></>
  }

  return (
    <>
      <Table
        shadow='none'
        className='border rounded-2xl border-[#4444444d]'
        aria-label='Dynamic table'
        topContent={<div className='flex justify-end'>{addItemModal}</div>}
        classNames={{
          base: 'max-h-[420px] overflow-y-auto',
        }}
        isHeaderSticky
      >
        <TableHeader>
          {table.columns.map((column, index) => (
            <TableColumn key={index}>{column.title}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={<EmptyContent />}>
          {table.data[table.currentTab]?.map((row, index) => (
            <TableRow key={index}>
              {table.columns.map((column, columnIndex) => (
                <TableCell key={columnIndex} className='default-text-color'>
                  <RenderCell row={row} column={column.uid} itemId={row.id} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editItemModal}
    </>
  )
}
