import { configureStore } from '@reduxjs/toolkit'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageUsersSlice } from '@renderer/features/usersSlice'

const store = configureStore({
  reducer: {
    user: manageUserSlice.reducer,
    users: manageUsersSlice.reducer,
  },
})

export default store
