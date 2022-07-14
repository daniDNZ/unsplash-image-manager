import { Box, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFilterTags, removeFilterTags, selectFilterTerm, selectOrderTerm, filterByTerm, setOrderTerm, selectFilterTags, selectTotalTags } from '../features/favImages/favImagesSlice'

const FilterTools = ({ isVisible }) => {
  const dispatch = useDispatch()
  const order = useSelector(selectOrderTerm)
  let display = 'none'
  isVisible ? display = 'block' : display = 'none'
  const arrChips = useSelector(selectTotalTags)
  const activeTags = useSelector(selectFilterTags)
  const handleChip = (e) => {
    const chip = e.currentTarget
    if (chip.style.color === 'white') {
      chip.style.color = 'inherit'
      chip.style.backgroundColor = 'inherit'
      dispatch(removeFilterTags(chip.children[0].textContent))
    } else {
      chip.style.backgroundColor = 'rgb(23,125,220)'
      chip.style.color = 'white'
      dispatch(addFilterTags(chip.children[0].textContent))
    }
  }

  useEffect(() => {
    // Highlight active tags when user returns from search page
    const tagChips = document.querySelectorAll('.tag-chip')
    activeTags.forEach(tag => {
      const activeTag = Array.from(tagChips).filter(chip => chip.children[0].textContent === tag)
      activeTag[0].style.backgroundColor = 'rgb(23,125,220)'
      activeTag[0].style.color = 'white'
    })
  }, [])

  return (
    <Box id='filterTools' mt='1rem' width='100%' display={display}>

      <Box
        justifyContent='flex-end' gap='1rem' display='flex'
      >
        <TextField id='filterTerm' label='Filtrar por descripción' variant='outlined' defaultValue={useSelector(selectFilterTerm)} onChange={e => dispatch(filterByTerm(e.target.value))} />
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel id='selectOrderLabel'>Ordenar</InputLabel>
          <Select
            labelId='selectOrderLabel'
            id='selectOrder'
            value={order}
            label='Ordenar'
            onChange={e => dispatch(setOrderTerm(e.target.value))}
          >
            <MenuItem value='date'>Fecha del fav</MenuItem>
            <MenuItem value='width'>Ancho</MenuItem>
            <MenuItem value='height'>Alto</MenuItem>
            <MenuItem value='likes'>Likes</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        justifyContent='flex-end' gap='.5rem' display='flex' flexWrap='wrap' mt='1rem'
      >
        {
          arrChips.map((chip, index) => {
            return index > 25 ? null : <Chip key={'chip-' + chip} className='tag-chip' label={chip} variant='outlined' onClick={handleChip} />
          })
        }
      </Box>
    </Box>
  )
}

export default FilterTools
