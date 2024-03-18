const inputs = [
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
]

const selectInputs = [
  {
    name: 'status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Paused', value: 'paused' },
      { label: 'Vacation', value: 'vacation' },
    ],
  },
  {
    name: 'role',
    options: [
      { label: 'CEO', value: 'CEO' },
      { label: 'Mod', value: 'Mod' },
      { label: 'Admin', value: 'Admin' },
      { label: 'Helper', value: 'Helper' },
    ],
  },
  {
    name: 'team',
    options: [
      { label: 'Bots', value: 'Bots' },
      { label: 'UX/UI', value: 'UX/UI' },
      { label: 'Data bases', value: 'Data bases' },
      { label: 'Development', value: 'Development' },
    ],
  },
]

export { selectInputs, inputs }
