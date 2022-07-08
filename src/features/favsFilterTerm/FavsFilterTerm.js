import { TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setFavsFilterTerm } from './favsFilterTermSlice'

const FilterTerm = () => {
  const dispatch = useDispatch()

  return (

    <TextField id='filterTerm' label='Filtrar por descripción' variant='outlined' onChange={e => dispatch(setFavsFilterTerm(e.target.value))} />

  )
}

export default FilterTerm
