import { createSlice } from '@reduxjs/toolkit'

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: {
    value: ''
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setSearchTerm } = searchTermSlice.actions

export const selectSearchTerm = (state) => state.searchTerm.value

export default searchTermSlice.reducer
