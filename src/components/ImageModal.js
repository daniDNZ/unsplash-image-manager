import { Modal, Box, Fade, Backdrop, Typography } from '@mui/material'

const modalStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const ImageModal = ({ img, open, setOpen }) => {
  let src = ''
  src = img.img + '?w=480&h=480&auto=format'

  const handleClose = () => {
    setOpen(false)
  }
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
          <img
            src={src}
            alt=''
            loading='lazy'
          />
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            {`${img.title} · ${img.width}x${img.height} · Likes: ${img.likes}`}
          </Typography>
          <Typography id='transition-modal-description' sx={{ mt: 2 }}>
            {img.description}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ImageModal
