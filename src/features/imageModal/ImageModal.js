import { Modal, Box, Fade, Backdrop, Typography, IconButton, TextareaAutosize, List, ListItem, ListItemText } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavImages, updateFavImages } from '../favImages/favImagesSlice'
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
  const arrFavImages = useSelector(selectFavImages).totalImages

  const src = (img.urls ? splitUrl(img.urls.thumb) + '?w=480&h=480&auto=format' : '')
  const imgAddedDate = (favModal ? (new Date(img.date).toLocaleDateString()) : '')

  const updateDescription = e => {
    const arrFavImagesCopy = [...arrFavImages]
    const imgIndex = arrFavImagesCopy.findIndex((item, index) => {
      if (item.id === img.id) return true
      else return false
    })
    arrFavImagesCopy[imgIndex] = { ...arrFavImagesCopy[imgIndex], description: e.target.value }

    setLocalStorageFavImages(arrFavImagesCopy)
    dispatch(updateFavImages())
    dispatch(setModalImage(arrFavImagesCopy[imgIndex]))
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

  const downloadImage = () => {
    fetch(img.urls.full)
      .then(response => response.blob())
      .then(blobObject => {
        const blob = window.URL.createObjectURL(blobObject)
        const anchor = document.createElement('a')
        anchor.style.display = 'none'
        anchor.href = blob
        anchor.download = `${img.id}`
        document.body.appendChild(anchor)
        anchor.click()
        window.URL.revokeObjectURL(blob)
      })
      .catch(() => console.log('No se ha podido descargar la imagen.'))
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
          <List dense sx={{ padding: '1rem 0' }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary={`Tamaño: ${img.width}x${img.height}`}
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary={`Likes: ${img.likes}`}
              />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText
                primary={`Añadido: ${imgAddedDate}`}
              />
            </ListItem>
            <IconButton
              sx={{ color: 'black', padding: '1rem 0', position: 'absolute', right: 0, top: 0 }}
              onClick={downloadImage}
            >

              <DownloadIcon />

            </IconButton>

          </List>

          {imageDescription}

        </Box>
      </Fade>
    </Modal>
  )
}

export default ImageModal
