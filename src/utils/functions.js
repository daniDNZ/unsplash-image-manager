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

const isInFavs = (idImg, arrayFavs) => {
  if (arrayFavs.length > 0) {
    const savedFav = arrayFavs.find(item => item.id === idImg)
    if (savedFav) return true
    else return false
  } else return false
}

const selectFavIcon = (idImg) => {
  const localStorageFavs = getLocalStorageFavImages()
  return (isInFavs(idImg, localStorageFavs) ? <FavoriteIcon /> : <FavoriteBorderIcon />)
}

export { splitUrl, isInFavs, selectFavIcon, getLocalStorageFavImages }
