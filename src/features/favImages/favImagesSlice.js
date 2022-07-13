import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorageFavImages } from '../../utils/functions'

export const favImagesSlice = createSlice({
  name: 'favImages',
  initialState: {
    results: getLocalStorageFavImages(),
    filterTerm: null,
    orderTerm: 'date'
  },
  reducers: {
    updateFavImages: (state) => { state.results = getLocalStorageFavImages() },
    setFilterTerm: (state, action) => {
      state.filterTerm = action.payload
    },
    setOrderTerm: (state, action) => {
      state.orderTerm = action.payload
    }
  }
})

export const { updateFavImages, setFilterTerm, setOrderTerm } = favImagesSlice.actions

export const selectFavImages = (state) => state.favImages.results
export const selectFilterTerm = (state) => state.favImages.filterTerm
export const selectOrderTerm = (state) => state.favImages.orderTerm

export default favImagesSlice.reducer
