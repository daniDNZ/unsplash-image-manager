import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavsOrderTerm, setFavsOrderTerm } from './favsOrderTermSlice'

const OrderTerm = () => {
  const order = useSelector(selectFavsOrderTerm)
  const dispatch = useDispatch()

  return (
    <FormControl sx={{ minWidth: '150px' }}>
      <InputLabel id='selectOrderLabel'>Ordenar</InputLabel>
      <Select
        labelId='selectOrderLabel'
        id='selectOrder'
        value={order}
        label='Ordenar'
        onChange={e => dispatch(setFavsOrderTerm(e.target.value))}
      >
        <MenuItem value='date'>Fecha del fav</MenuItem>
        <MenuItem value='width'>Ancho</MenuItem>
        <MenuItem value='height'>Alto</MenuItem>
        <MenuItem value='likes'>Likes</MenuItem>
      </Select>
    </FormControl>
  )
}

export default OrderTerm
