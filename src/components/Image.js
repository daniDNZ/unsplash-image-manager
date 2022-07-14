import { ImageListItemBar, ImageListItem, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavImages, updateFavImages } from '../features/favImages/favImagesSlice'
import { setModalImage, toggleModal } from '../features/imageModal/imageModalSlice'
import { selectFavIcon, splitUrl, toggleFavImage } from '../utils/functions'

const srcset = (imgUrl, size) => {
  const splitted = splitUrl(imgUrl)
  return {
    src: `${splitted}?w=${size}&h=${size}&fit=crop&auto=format`,
    srcSet: `${splitted}?w=${size}&h=${
      size
    }&fit=crop&auto=format&dpr=2 2x`
  }
}

const Image = ({ item, arrImages, rowHeight }) => {
  const [favIcon, setFavIcon] = useState()
  const dispatch = useDispatch()
  const favImages = useSelector(selectFavImages)

  const handleOpen = () => {
    dispatch(setModalImage(arrImages[arrImages.indexOf(item)]))
    dispatch(toggleModal())
  }

  const favIconClickHandler = () => {
    setFavIcon(toggleFavImage(item.id, arrImages))
    dispatch(updateFavImages())
  }

  const showImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 1
  }
  const hideImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 0
  }

  useEffect(() => {
    setFavIcon(selectFavIcon(item.id))
  }, [dispatch, favImages])

  return (
    <ImageListItem
      data-id={item.id} className='image-list-item' onMouseOver={showImageBar}
      onMouseLeave={hideImageBar}
    >
      <img
        {...srcset(item.urls.thumb, rowHeight)}
        alt={item.alt_description}
        loading='lazy'
        onClick={handleOpen}
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
            onClick={favIconClickHandler}
          >

            {favIcon}

          </IconButton>
            }
        actionPosition='left'
      />
    </ImageListItem>
  )
}

export default Image
