import { ImageList } from '@mui/material'
import { useEffect, useState } from 'react'
import ImageModal from './ImageModal'
import Image from './Image'

const Gallery = ({ itemData, addDate }) => {
  let addImageDate = false
  if (addDate) addImageDate = true
  let rowHeight = 120
  if (window.screen.width >= 1024) rowHeight = 240
  const arrImages = itemData

  const showImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 1
  }
  const hideImageBar = (e) => {
    e.currentTarget.children[1].style.opacity = 0
  }
  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalImg, setModalImg] = useState({})

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
          <Image key={item.id} item={item} arrImages={arrImages} rowHeight={rowHeight} setModalImg={setModalImg} setModalIsOpen={setModalIsOpen} />
        ))}
      </ImageList>
      <ImageModal img={modalImg} open={modalIsOpen} setOpen={setModalIsOpen} addDate={addImageDate} />
    </>
  )
}

export default Gallery
