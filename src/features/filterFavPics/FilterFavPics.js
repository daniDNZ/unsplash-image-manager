import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'

const FilterFavPics = () => {
  const [order, setOrder] = useState('')
  const handleChange = e => {
    setOrder(e.target.value)
  }
  return (
    <Box mt='1rem' width='100%' display='flex' justifyContent='flex-end' sx={{ display: 'none' }}>
      <TextField id='filterTerm' label='Filtrar por descripción' variant='outlined' />
      <FormControl sx={{ marginLeft: '1rem', minWidth: '150px' }}>
        <InputLabel id='selectOrderLabel'>Ordenar</InputLabel>
        <Select
          labelId='selectOrderLabel'
          id='selectOrder'
          value={order}
          label='Ordenar'
          onChange={handleChange}
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

export default FilterFavPics
