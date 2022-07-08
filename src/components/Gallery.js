import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { ImageListItemBar, ImageList, ImageListItem, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import ImageModal from './ImageModal'

const srcset = (image, size, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`
  }
}

const Gallery = ({ itemData }) => {
  const showImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 1
  }
  const hideImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 0
  }

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalImg, setModalImg] = useState({})
  const handleOpen = e => {
    setModalImg(itemData.find(item => item.id === e.currentTarget.dataset.id))
    setModalIsOpen(true)
  }

  useEffect(() => {
    // Listeners
    const imageListItems = document.querySelectorAll('.image-list-item')
    imageListItems.forEach(item => {
      item.addEventListener('mouseover', showImageBar)
      item.addEventListener('mouseleave', hideImageBar)
    })

    return () => {
      imageListItems.forEach(item => {
        item.removeEventListener('mouseover', showImageBar)
        item.removeEventListener('mouseleave', hideImageBar)
      })
    }
  }, [itemData])
  return (
    <>
      <ImageList cols={4} variant='quilted' rowHeight={121}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} data-id={item.id} cols={item.cols || 1} rows={item.rows || 1} className='image-list-item' onClick={handleOpen}>
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading='lazy'
            />
            <ImageListItemBar
              className='image-list-item__bar'
              sx={{
                background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
              'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                opacity: 0,
                transition: 'opacity .2s ease-in-out'
              }}
              title={item.width + 'x' + item.height}
              position='top'
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.title}`}
                >
                  <FavoriteBorderIcon />
                </IconButton>
            }
              actionPosition='left'
            />
          </ImageListItem>
        ))}
      </ImageList>
      <ImageModal img={modalImg} open={modalIsOpen} setOpen={setModalIsOpen} />
    </>
  )
}

export default Gallery
