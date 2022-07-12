import { ImageList } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectFavsFilterTerm } from '../features/favsFilterTerm/favsFilterTermSlice'
import { selectFavsOrderTerm } from '../features/favsOrderTerm/favsOrderTermSlice'
import ImageModal from '../features/imageModal/ImageModal'
import Image from './Image'

const Gallery = ({ itemData, favGallery }) => {
  let favModal = false
  let favsFilterTerm = ''
  let arrImages = []

  if (favGallery) {
    favModal = true
    favsFilterTerm = useSelector(selectFavsFilterTerm)
    if (favsFilterTerm !== '') {
      arrImages = [...itemData.filter(item => {
        return item.description !== null
          ? item.description.search(favsFilterTerm) !== -1
          : false
      })]
    } else arrImages = [...itemData]

    const favsOrderTerm = useSelector(selectFavsOrderTerm)
    arrImages.sort((a, b) => b[favsOrderTerm] - a[favsOrderTerm])
  } else arrImages = [...itemData]

  let rowHeight = 120
  if (window.screen.width >= 1024) rowHeight = 240

  const showImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 1
  }
  const hideImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 0
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
      <ImageList cols={3} variant='quilted' rowHeight={rowHeight}>
        {arrImages.map((item) => (
          <Image key={item.id} item={item} arrImages={arrImages} rowHeight={rowHeight} />
        ))}
      </ImageList>
      <ImageModal favModal={favModal} arrImages={arrImages} />
    </>
  )
}

export default Gallery
