import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/TableUser'
import { setUsers } from '@renderer/features/usersSlice'
import { useDispatch } from 'react-redux'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import { EditUserProfileModal } from '@renderer/components/Modals/editUser'
import { deleteUser, addUser, editUser } from '@renderer/features/usersSlice'
import { reqAddStaff, reqEditStaff, reqDeleteStaff, reqLoadAllStaff } from '@renderer/api/Requests'

export const StaffTable = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const handleLoadInfo = async () => {
      try {
        const response = await reqLoadAllStaff()
        dispatch(setUsers(response.data))
      } catch (error) {
        toast.error('Ocurrió un error al cargar los datos')
      }
    }
    handleLoadInfo()
  }, [])

  const columnsData = {
    columns: [
      { name: 'NOMBRE', uid: 'name' },
      { name: 'APELLIDO', uid: 'lastName' },
      { name: 'ID', uid: 'id' },
      { name: 'CEDULA', uid: 'CI' },
      { name: 'GÉNERO', uid: 'gender' },
      { name: 'EDAD', uid: 'age', sortable: true },
      { name: 'EMAIL', uid: 'email' },
      { name: 'TELEFONO', uid: 'phone' },
      { name: 'DIRECCION', uid: 'address' },
      { name: 'CARGO NOMINAL', uid: 'cargoNominal' },
      { name: 'DEPENDENCIAS', uid: 'dependencias' },
      { name: 'TALLA CAMISAS', uid: 'tallaCamisas' },
      { name: 'EGRESADOS', uid: 'egresados' },
      { name: 'NUMERO DE HIJOS', uid: 'numeroHijos' },
      { name: 'PLACA DEL CARRO', uid: 'placaCarro' },
      { name: 'JUBILADOS', uid: 'jubilados' },
      { name: 'ACCIÓN', uid: 'actions' },
    ],
    statusOptions: [
      { name: 'Vivo', uid: 'ALIVE' },
      { name: 'Muerto', uid: 'DEAD' },
    ],
    InitialVisibleColumns: [
      'name',
      'lastName',
      'id',
      'CI',
      'gender',
      'age',

      'phone',
      'actions',
      /*  'address',
          'email',
      'cargoNominal',
      'dependencias',
      'tallaCamisas',
      'egresados',
      'numeroHijos',
      'placaCarro',
      'jubilados', */
    ],
  }

  /* Datos de los inputs del modal para crear usuarios */
  const modalInputs = {
    inputs: [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
      },
      {
        type: 'text',
        name: 'lastName',
        label: 'Apellido',
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
      },
      {
        type: 'number',
        name: 'CI',
        label: 'Cédula',
      },
      {
        type: 'number',
        name: 'age',
        label: 'Edad',
      },
      {
        type: 'text',
        name: 'avatar',
        label: 'Avatar',
      },
      {
        type: 'phone',
        name: 'phone',
        label: 'Telefono',
      },
      {
        type: 'text',
        name: 'address',
        label: 'Dirección',
      },
      {
        type: 'text',
        name: 'cargoNominal',
        label: 'Cargo nominal',
      },
      {
        type: 'text',
        name: 'dependencias',
        label: 'Dependencias',
      },
      {
        type: 'text',
        name: 'tallaCamisas',
        label: 'Talla de camisa',
      },
      {
        type: 'text',
        name: 'egresados',
        label: 'Egresados',
      },
      {
        type: 'text',
        name: 'numeroHijos',
        label: 'Numero de hijos',
      },
      {
        type: 'text',
        name: 'placaCarro',
        label: 'Placa del carro',
      },
      {
        type: 'text',
        name: 'jubilados',
        label: 'Jubilados',
      },
    ],
    selectInputs: [
      {
        name: 'gender',
        label: 'Género',
        options: [
          { label: 'Masculino', value: 'MALE' },
          { label: 'Femenino', value: 'FEMALE' },
        ],
      },
    ],
  }

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteUser(id))
        await reqDeleteStaff(id)
        toast.success('Personal eliminado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqAddStaff({ ...data, age: parseInt(data.age) })
        dispatch(addUser(response.data))
        toast.success('Personal guardado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editUser({ data, id: currentUserEdit?.id }))
        await reqEditStaff({
          data,
          id: currentUserEdit?.id,
        })
        toast.success('Personal editado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newUserModal = {
    title: 'Agrega a un nuevo personal',
    buttonTitle: 'Agregar personal',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar personal',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      tableActions={tableActions}
      columnsData={columnsData}
      createNewUserModal={<CreateNewUserModal modal={newUserModal} />}
      editUserProfileModal={<EditUserProfileModal modal={editUserModal} />}
    />
  )
}
