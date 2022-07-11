import { ImageListItemBar, ImageListItem, IconButton } from '@mui/material'
import { useState } from 'react'
import { getLocalStorageFavImages, isInFavs, selectFavIcon, splitUrl } from '../utils/functions'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch } from 'react-redux'
import { updateFavImages } from '../features/favImages/favImagesSlice'

const srcset = (imgUrl, size) => {
  const splitted = splitUrl(imgUrl)
  return {
    src: `${splitted}?w=${size}&h=${size}&fit=crop&auto=format`,
    srcSet: `${splitted}?w=${size}&h=${
      size
    }&fit=crop&auto=format&dpr=2 2x`
  }
}

const Image = ({ item, arrImages, rowHeight, setModalImg, setModalIsOpen }) => {
  const [favIcon, setFavIcon] = useState(selectFavIcon(item.id))
  const dispatch = useDispatch()

  const toggleFavImage = (idImg) => {
    const localStorageFavs = getLocalStorageFavImages()
    let favImages = ''

    if (isInFavs(idImg, localStorageFavs)) {
      favImages = JSON.stringify(localStorageFavs.filter(item => item.id !== idImg))
      setFavIcon(<FavoriteBorderIcon />)
    } else {
      const newImage = arrImages.find(item => item.id === idImg)
      localStorageFavs.push({
        id: newImage.id,
        description: newImage.description,
        width: newImage.width,
        height: newImage.height,
        likes: newImage.likes,
        urls: {
          full: newImage.urls.full,
          thumb: newImage.urls.thumb
        },
        date: new Date().toISOString()
      })
      favImages = JSON.stringify(localStorageFavs)
      setFavIcon(<FavoriteIcon />)
    }
    window.localStorage.setItem('favImages', favImages)
    dispatch(updateFavImages())
  }

  const handleOpen = imgId => {
    setModalImg(arrImages.find(item => item.id === imgId))
    setModalIsOpen(true)
  }

  return (
    <ImageListItem data-id={item.id} className='image-list-item'>
      <img
        {...srcset(item.urls.thumb, rowHeight)}
        alt={item.alt_description}
        loading='lazy'
        onClick={() => handleOpen(item.id)}
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
            onClick={() => toggleFavImage(item.id)}
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
