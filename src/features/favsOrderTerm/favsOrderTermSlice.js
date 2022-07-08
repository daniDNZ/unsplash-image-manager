import { createSlice } from '@reduxjs/toolkit'

export const favsOrderTermSlice = createSlice({
  name: 'favsOrderTerm',
  initialState: {
    value: 'date'
  },
  reducers: {
    setFavsOrderTerm: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setFavsOrderTerm } = favsOrderTermSlice.actions

export const selectFavsOrderTerm = (state) => state.favsOrderTerm.value

export default favsOrderTermSlice.reducer
