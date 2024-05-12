import { configureStore } from '@reduxjs/toolkit'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageUsersSlice } from '@renderer/features/usersSlice'
import { manageConsultsSlice } from '@renderer/features/consultSlice'

const store = configureStore({
  reducer: {
    user: manageUserSlice.reducer,
    users: manageUsersSlice.reducer,
    consult: manageConsultsSlice.reducer,
  },
})

export default store
