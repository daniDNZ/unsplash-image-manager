import { createSlice } from '@reduxjs/toolkit'

export const imageModalSlice = createSlice({
  name: 'imageModal',
  initialState: {
    open: false,
    image: {}
  },
  reducers: {
    toggleModal: (state) => {
      state.open ? state.open = false : state.open = true
    },
    setModalImage: (state, action) => {
      state.image = action.payload
    }
  }
})

export const { toggleModal, setModalImage } = imageModalSlice.actions

export const selectModalOpen = (state) => state.imageModal.open
export const selectModalImage = (state) => state.imageModal.image

export default imageModalSlice.reducer
