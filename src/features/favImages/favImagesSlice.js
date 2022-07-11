import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorageFavImages } from '../../utils/functions'
import { selectFavsFilterTerm } from '../favsFilterTerm/favsFilterTermSlice'

export const favImagesSlice = createSlice({
  name: 'favImages',
  initialState: {
    images: getLocalStorageFavImages(),
    filteredImages: [],
    orderedImages: []
  },
  reducers: {
    updateFavImages: (state) => { state.images = getLocalStorageFavImages() },
    filterByTerm: (state) => {
      const arrayFiltered = []
      state.images.foreach(image => {
        if (image.description.search((selectFavsFilterTerm())) !== -1) {
          arrayFiltered.push(image)
        }
        state.filteredImages = arrayFiltered
      })
    },
    orderImages: (state, action) => {

    }
  }
})

export const { updateFavImages } = favImagesSlice.actions

export const selectFavImages = (state) => state.favImages.images

export default favImagesSlice.reducer
