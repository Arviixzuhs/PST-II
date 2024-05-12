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
      { label: 'Vivo', value: 'ALIVE' },
      { label: 'Muerto', value: 'DEAD' },
    ],
  },
]

export { selectInputs, inputs }
