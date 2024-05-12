const columns = [
  { name: 'NOMBRE', uid: 'name' },
  { name: 'APELLIDO', uid: 'lastName' },
  { name: 'ID', uid: 'id' },
  { name: 'CEDULA', uid: 'CI' },
  { name: 'EDAD', uid: 'age', sortable: true },
  { name: 'EMAIL', uid: 'email' },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'ACCIÓN', uid: 'actions' },
]

const statusOptions = [
  { name: 'Vivo', uid: 'vivo' },
  { name: 'Muerto', uid: 'muerto' },
]

const InitialVisibleColumns = [
  'CI',
  'age',
  'role',
  'name',
  'email',
  'status',
  'actions',
  'lastName',
]

export { columns, statusOptions, InitialVisibleColumns }
