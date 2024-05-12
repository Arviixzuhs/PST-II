import { createSlice } from '@reduxjs/toolkit'

export const manageConsultsSlice = createSlice({
  name: 'consults',
  initialState: {
    data: <any[]>[],
    currentConsultId: -1,
    currentConsultDate: {},
  },
  reducers: {
    setConsults: (state, action) => {
      state.data = action.payload
    },
    addConsult: (state, action) => {
      state.data.push(action.payload)
    },
    editConsult: (state, action) => {
      const { data, id } = action.payload
      const consultIndex = state.data.findIndex((item) => item.id == id)

      if (consultIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[consultIndex][key] = data[key]
        })
      }
    },
    deleteConsult: (state, action) => {
      const id = action.payload
      const consultIndex = state.data.findIndex((item) => item.id == id)

      if (consultIndex !== -1) {
        state.data.splice(consultIndex, 1)
      }
    },
    setCurrentConsultId: (state, action) => {
      state.currentConsultId = action.payload
    },
    setCurrentConsultDate: (state, action) => {
      state.currentConsultDate = action.payload
    },
  },
})

export const {
  setConsults,
  addConsult,
  editConsult,
  deleteConsult,
  setCurrentConsultId,
  setCurrentConsultDate,
} = manageConsultsSlice.actions
