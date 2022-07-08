import { Box, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setSearchTerm } from './searchTermSlice'

const searchTerm = () => {
  const dispatch = useDispatch()

  return (
    <Box mt='1rem'>
      <TextField fullWidth label='Buscar en Unsplash' id='searchTerm' onChange={e => dispatch(setSearchTerm(e.target.value))} />
    </Box>
  )
}
export default searchTerm
