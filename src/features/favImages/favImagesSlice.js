import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorageFavImages } from '../../utils/functions'

const buildResultObject = totalImages => ({
  currentPage: 1,
  totalImages,
  results: totalImages.slice(0, 30),
  totalPages: Math.ceil(totalImages.length / 30)
})

const searchByDescription = (arrImages, term) => {
  const filteredImages = arrImages.filter(item => {
    return item.description !== null
      ? item.description.toLowerCase().search(term.toLowerCase()) !== -1
      : false
  })
  return buildResultObject(filteredImages)
}

const searchInTags = (arrImages, tag) => {
  const filteredImages = arrImages.filter(item => {
    if (item.tags !== undefined) {
      const found = item.tags.find(iTag => iTag.title.toLowerCase() === tag.toLowerCase())
      return found !== undefined
    }
    return false
  })
  return filteredImages
}

const searchByTags = (arrImages, activeTags) => {
  let totalImages
  if (activeTags.length > 0) {
    activeTags.forEach(tag => {
      const foundByTags = searchInTags(arrImages, tag)
      const foundByDescription = searchByDescription(arrImages, tag).totalImages
      totalImages = [...foundByTags, ...foundByDescription]
    })
    totalImages = [...new Set(totalImages)]
  } else totalImages = arrImages

  return buildResultObject(totalImages)
}

const arrResults = getLocalStorageFavImages()
const updateTotalTags = (arrImages) => {
  let totalTags = []
  arrImages.forEach(element => {
    if (element.tags !== undefined) {
      totalTags = [...totalTags, ...element.tags]
    }
  })
  const uniqueTitles = []
  totalTags.forEach(item => {
    const isDuplicate = uniqueTitles.includes(item.title)
    if (!isDuplicate) {
      uniqueTitles.push(item.title)
      return true
    }
    return false
  })

  return uniqueTitles
}
const totalTags = updateTotalTags(arrResults)

export const favImagesSlice = createSlice({
  name: 'favImages',
  initialState: {
    results: {
      results: arrResults.slice(0, 30),
      totalPages: Math.ceil(arrResults.length / 30),
      currentPage: 1,
      totalImages: arrResults
    },
    filteredResults: {
      results: arrResults.slice(0, 30),
      totalPages: Math.ceil(arrResults.length / 30),
      currentPage: 1,
      totalImages: arrResults
    },
    filterTerm: null,
    orderTerm: 'date',
    activeTags: [],
    totalTags
  },
  reducers: {
    updateFavImages: (state) => {
      const arrResults = getLocalStorageFavImages()
      state.results = {
        ...state.results,
        results: arrResults.slice(0, 30),
        totalPages: Math.ceil(arrResults.length / 30),
        totalImages: arrResults
      }
      state.filteredResults = { ...state.results }
      if (state.activeTags.length > 0) {
        state.filteredResults = searchByTags(state.filteredResults.totalImages, state.activeTags)
      }
      if (state.filterTerm && state.filterTerm.length > 0) {
        state.filteredResults = searchByDescription(state.filteredResults.totalImages, state.filterTerm)
      }
      state.totalTags = updateTotalTags(state.results.totalImages)
    },
    filterByTerm: (state, action) => {
      if (state.filteredResults.totalImages.length === 0) state.filteredResults = { ...state.results }
      state.filterTerm = action.payload

      if (action.payload.length > 0) {
        state.filteredResults = searchByDescription(state.results.totalImages, action.payload)
      } else state.filteredResults = { ...state.results }

      if (state.activeTags.length > 0) {
        state.filteredResults = searchByTags(state.filteredResults.totalImages, state.activeTags)
      }
    },
    setOrderTerm: (state, action) => {
      state.orderTerm = action.payload
    },
    addFilterTags: (state, action) => {
      if (state.filteredResults.length === 0) state.filteredResults = { ...state.results }
      state.activeTags = [...state.activeTags, action.payload]
      state.filteredResults = searchByTags(state.filteredResults.totalImages, state.activeTags)
    },
    removeFilterTags: (state, action) => {
      const results = { ...state.results }
      state.activeTags = state.activeTags.filter(tag => tag !== action.payload)
      state.filteredResults = searchByTags(results.totalImages, state.activeTags)

      if (state.filterTerm && state.filterTerm.length > 0) {
        state.filteredResults = searchByDescription(results.totalImages, state.filterTerm)
      }
    }
  }
})

export const { updateFavImages, filterByTerm, setOrderTerm, addFilterTags, removeFilterTags } = favImagesSlice.actions

export const selectFavImages = (state) => state.favImages.results
export const selectFilteredFavImages = (state) => state.favImages.filteredResults
export const selectFilterTerm = (state) => state.favImages.filterTerm
export const selectOrderTerm = (state) => state.favImages.orderTerm
export const selectFilterTags = (state) => state.favImages.activeTags
export const selectTotalTags = (state) => state.favImages.totalTags

export default favImagesSlice.reducer
