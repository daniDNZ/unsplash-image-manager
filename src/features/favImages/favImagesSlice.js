import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorageFavImages } from '../../utils/functions'

const searchInDescription = (arrImages, term) => {
  const filteredImages = [...arrImages.filter(item => {
    return item.description !== null
      ? item.description.search(term) !== -1
      : false
  })]
  return filteredImages
}

const arrResults = getLocalStorageFavImages()

export const favImagesSlice = createSlice({
  name: 'favImages',
  initialState: {
    results: arrResults,
    filteredResults: arrResults,
    filterTerm: null,
    orderTerm: 'date',
    activeTags: []
  },
  reducers: {
    updateFavImages: (state) => { state.results = getLocalStorageFavImages() },
    filterByTerm: (state, action) => {
      if (state.filteredResults.length === 0) state.filteredResults = [...state.results]
      state.filterTerm = action.payload
      if (action.payload.length > 0) {
        state.filteredResults = searchInDescription(state.filteredResults, state.filterTerm)
      } else if (state.activeTags.length > 0) {
        state.activeTags.forEach(tag => {
          state.filteredResults = searchInDescription(state.results, tag)
        })
      } else state.filteredResults = [...state.results]
    },
    setOrderTerm: (state, action) => {
      state.orderTerm = action.payload
    },
    addFilterTags: (state, action) => {
      if (state.filteredResults.length === 0) state.filteredResults = [...state.results]
      state.activeTags = [...state.activeTags, action.payload]
      state.activeTags.forEach(tag => {
        state.filteredResults = searchInDescription(state.filteredResults, tag)
      })
    },
    removeFilterTags: (state, action) => {
      state.filteredResults = [...state.results]
      state.activeTags = state.activeTags.filter(tag => tag !== action.payload)
      state.activeTags.forEach(tag => {
        state.filteredResults = searchInDescription(state.filteredResults, tag)
      })
    }
  }
})

export const { updateFavImages, filterByTerm, setOrderTerm, addFilterTags, removeFilterTags } = favImagesSlice.actions

export const selectFavImages = (state) => state.favImages.results
export const selectFilteredFavImages = (state) => state.favImages.filteredResults
export const selectFilterTerm = (state) => state.favImages.filterTerm
export const selectOrderTerm = (state) => state.favImages.orderTerm
export const selectFilterTags = (state) => state.favImages.activeTags

export default favImagesSlice.reducer
