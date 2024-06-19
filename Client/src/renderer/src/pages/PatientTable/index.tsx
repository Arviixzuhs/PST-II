import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@renderer/components/TableUser'
import { setUsers } from '@renderer/features/usersSlice'
import { useDispatch } from 'react-redux'
import {
  reqAddPatient,
  reqEditPatient,
  reqDeletePatient,
  reqLoadAllPatients,
} from '@renderer/api/Requests'
import { CreateNewUserModal } from '@renderer/components/Modals/newUser'
import { EditUserProfileModal } from '@renderer/components/Modals/editUser'
import { deleteUser, addUser, editUser } from '@renderer/features/usersSlice'

export const PatientTable = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const handleLoadInfo = async () => {
      try {
        const response = await reqLoadAllPatients()
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
      { name: 'STATUS', uid: 'status', sortable: true },
      { name: 'ACCIÓN', uid: 'actions' },
    ],
    statusOptions: [
      { name: 'Vivo', uid: 'ALIVE' },
      { name: 'Muerto', uid: 'DEAD' },
    ],
    InitialVisibleColumns: ['CI', 'age', 'role', 'name', 'gender', 'status', 'actions', 'lastName'],
  }

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
    ],
    selectInputs: [
      {
        name: 'status',
        label: 'Estado del paciente',
        options: [
          { label: 'Vivo', value: 'ALIVE' },
          { label: 'Muerto', value: 'DEAD' },
        ],
      },
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
        await reqDeletePatient(id)
        toast.success('Paciente eliminado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqAddPatient({ ...data, age: parseInt(data.age) })
        dispatch(addUser(response.data))
        toast.success('Paciente guardado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editUser({ data, id: currentUserEdit?.id }))
        await reqEditPatient({
          data,
          id: currentUserEdit?.id,
        })
        toast.success('Paciente editado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newUserModal = {
    title: 'Agrega a un nuevo paciente',
    buttonTitle: 'Agregar paciente',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar paciente',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <AppTable
      columnsData={columnsData}
      tableActions={tableActions}
      createNewUserModal={<CreateNewUserModal modal={newUserModal} />}
      editUserProfileModal={<EditUserProfileModal modal={editUserModal} />}
    />
  )
}
