import { PropTypes } from 'prop-types'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

function TableCells({ id, index, items }) {
  return (
    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell sx={{ fontWeight: 'bold' }}>{items.name && items.name}</TableCell>
      <TableCell align='right'>{items.calories && items.calories}</TableCell>
      {id == 'nutritionTable' && (
        <>
          <TableCell align='right'>{items.fat_total_g && items.fat_total_g}</TableCell>
          <TableCell align='right'>{items.carbohydrates_total_g && items.carbohydrates_total_g}</TableCell>
          <TableCell align='right'>{items.protein_g && items.protein_g}</TableCell>
          <TableCell align='right'>{items.serving_size_g && items.serving_size_g}</TableCell>
        </>
      )}

      {id == 'activityTable' && (
        <>
          <TableCell align='right'>{items.activity_time && items.activity_time}</TableCell>
          <TableCell align='right'>{items.activity_length && items.activity_length}</TableCell>
        </>
      )}
    </TableRow>
  )
}

TableCells.propTypes = {
  items: PropTypes.object.isRequired,
}

export default TableCells
