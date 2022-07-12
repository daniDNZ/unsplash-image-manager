import { Modal, Box, Fade, Backdrop, Typography, IconButton, TextareaAutosize } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavImages } from '../favImages/favImagesSlice'
import { selectFavIcon, setLocalStorageFavImages, splitUrl, toggleFavImage } from '../../utils/functions'
import { selectModalImage, setModalImage, selectModalOpen, toggleModal } from './imageModalSlice'

const modalStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '80vw',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const ImageModal = ({ favModal, arrImages }) => {
  const [favIcon, setFavIcon] = useState(<></>)
  const dispatch = useDispatch()
  const open = useSelector(selectModalOpen)
  const img = useSelector(selectModalImage)

  const src = (img.urls ? splitUrl(img.urls.thumb) + '?w=480&h=480&auto=format' : '')
  const imgDateAdded = (favModal ? (' · ' + new Date(img.date).toLocaleDateString()) : '')

  const updateDescription = e => {
    const arrFavImages = [...arrImages]
    const imgIndex = arrImages.findIndex((item, index) => {
      if (item.id === img.id) return true
      else return false
    })
    arrFavImages[imgIndex] = { ...arrFavImages[imgIndex], description: e.target.value }

    setLocalStorageFavImages(arrFavImages)
    dispatch(updateFavImages())
    dispatch(setModalImage(arrFavImages[imgIndex]))
  }

  const imageDescription = (favModal
    ? (
      <TextareaAutosize
        maxRows={4}
        placeholder='Sin descripción'
        defaultValue={img.description}
        onChange={updateDescription}
      />
      )
    : (
      <Typography id='transition-modal-description' sx={{ mt: 2 }}>
        {img.description}
      </Typography>
      ))

  const handleClose = () => {
    dispatch(toggleModal())
  }

  const favIconClickHandler = () => {
    setFavIcon(toggleFavImage(img.id, arrImages))
    dispatch(updateFavImages())
  }

  useEffect(() => {
    setFavIcon(selectFavIcon(img.id))
  }, [open])

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <IconButton
            sx={{ color: 'red', position: 'absolute', margin: '.5rem' }}
            aria-label={`star ${img.title}`}
            onClick={favIconClickHandler}
          >

            {favIcon}

          </IconButton>
          <img
            src={src}
            alt=''
            loading='lazy'
          />
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            {`${img.width}x${img.height} · Likes: ${img.likes}${imgDateAdded}`}
          </Typography>
          {imageDescription}
        </Box>
      </Fade>
    </Modal>
  )
}

export default ImageModal
