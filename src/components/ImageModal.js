import { Modal, Box, Fade, Backdrop, Typography, IconButton } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavImages } from '../features/favImages/favImagesSlice'
import { selectFoundImages } from '../features/foundImages/foundImagesSlice'
import { selectFavIcon, splitUrl, toggleFavImage } from '../utils/functions'

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

const ImageModal = ({ img, open, setOpen, addDate }) => {
  const [favIcon, setFavIcon] = useState(<></>)
  const dispatch = useDispatch()
  const arrImages = useSelector(selectFoundImages).results

  const src = (img.urls ? splitUrl(img.urls.thumb) + '?w=480&h=480&auto=format' : '')

  const imgDateAdded = (addDate ? (' · ' + new Date(img.date).toLocaleDateString()) : '')

  const handleClose = () => {
    setOpen(false)
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
            sx={{ color: 'red', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, .1)', margin: '.5rem' }}
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
          <Typography id='transition-modal-description' sx={{ mt: 2 }}>
            {img.description}
          </Typography>
          <IconButton
            sx={{ color: 'black' }}
            onClick={favIconClickHandler}
          >

            <DownloadIcon />

          </IconButton>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ImageModal
