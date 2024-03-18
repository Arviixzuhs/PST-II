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
  { name: 'Active', uid: 'active' },
  { name: 'Paused', uid: 'paused' },
  { name: 'Vacation', uid: 'vacation' },
]

export { columns, statusOptions }
