import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilterTerm, selectOrderTerm, setFilterTerm, setOrderTerm } from '../features/favImages/favImagesSlice'

const FilterTools = ({ isVisible }) => {
  const dispatch = useDispatch()
  const order = useSelector(selectOrderTerm)
  let display = 'none'
  isVisible ? display = 'flex' : display = 'none'

  return (

    <Box
      id='filterTools' mt='1rem' width='100%' justifyContent='flex-end' gap='1rem' display={display}
    >
      <TextField id='filterTerm' label='Filtrar por descripción' variant='outlined' defaultValue={useSelector(selectFilterTerm)} onChange={e => dispatch(setFilterTerm(e.target.value))} />
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
  )
}

export default FilterTools
