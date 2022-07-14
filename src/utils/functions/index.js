import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const splitUrl = (url) => {
  const splitted = url.split('?')[0]
  return splitted
}

const getLocalStorageFavImages = () => {
  let localStorageFavs = []
  if (window.localStorage.getItem('favImages')) {
    localStorageFavs = JSON.parse(window.localStorage.getItem('favImages'))
  }
  return localStorageFavs
}

const setLocalStorageFavImages = (arrImages) => {
  if (arrImages.length > 0) {
    window.localStorage.setItem('favImages', JSON.stringify(arrImages))
  }
}

// arrayFavs.indexOf(img) === -1 ? false : true
const isInFavs = (idImg, arrayFavs) => {
  if (arrayFavs.length > 0) {
    const savedFav = arrayFavs.find(item => item.id === idImg)
    if (savedFav) return true
  }
  return false
}

const selectFavIcon = (idImg) => {
  const localStorageFavs = getLocalStorageFavImages()
  return (isInFavs(idImg, localStorageFavs) ? <FavoriteIcon /> : <FavoriteBorderIcon />)
}

const toggleFavImage = (idImg, arrImages) => {
  const localStorageFavs = getLocalStorageFavImages()
  let favImages = ''
  let favIcon = <></>

  if (isInFavs(idImg, localStorageFavs)) {
    favImages = localStorageFavs.filter(item => item.id !== idImg)
    favIcon = <FavoriteBorderIcon />
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
      date: new Date().toISOString(),
      tags: newImage.tags
    })
    favImages = localStorageFavs
    favIcon = <FavoriteIcon />
  }
  setLocalStorageFavImages(favImages)

  return favIcon
}

export { splitUrl, isInFavs, selectFavIcon, getLocalStorageFavImages, setLocalStorageFavImages, toggleFavImage }
