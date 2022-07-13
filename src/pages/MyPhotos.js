import { FilterList } from '@mui/icons-material'
import { Typography, Box, IconButton } from '@mui/material'
import { useState } from 'react'
import FilterTools from '../components/FilterTools'
import FavImages from '../features/favImages/FavImages'

const MyPhotos = () => {
  const [filterToolsIsVisible, setFilterToolsIsVisible] = useState(false)
  const showFilterTools = () => {
    filterToolsIsVisible
      ? setFilterToolsIsVisible(false)
      : setFilterToolsIsVisible(true)
  }
  return (
    <>
      <Box mt='2rem' display='flex' justifyContent='space-between'>
        <Typography variant='h4' component='h2'>
          My Photos
        </Typography>
        <IconButton aria-label='filter' onClick={showFilterTools}>
          <FilterList />
        </IconButton>
      </Box>
      <FilterTools isVisible={filterToolsIsVisible} />
      <FavImages />
    </>
  )
}

export default MyPhotos
