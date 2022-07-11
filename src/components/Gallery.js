import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { ImageListItemBar, ImageList, ImageListItem, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import ImageModal from './ImageModal'

const splitUrl = (url) => {
  const splitted = url.split('?')[0]
  return splitted
}

const srcset = (imgUrl, size) => {
  const splitted = splitUrl(imgUrl)
  return {
    src: `${splitted}?w=${size}&h=${size}&fit=crop&auto=format`,
    srcSet: `${splitted}?w=${size}&h=${
      size
    }&fit=crop&auto=format&dpr=2 2x`
  }
}

const Gallery = ({ itemData }) => {
  const rowHeight = 121
  const arrImages = itemData[itemData.length - 1].results

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
      <ImageList cols={4} variant='quilted' rowHeight={rowHeight}>
        {arrImages.map((item) => (
          <ImageListItem key={item.id} data-id={item.id} className='image-list-item' onClick={handleOpen}>
            <img
              {...srcset(item.urls.regular, rowHeight)}
              alt={item.alt_description}
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
