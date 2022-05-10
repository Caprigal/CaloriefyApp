import { PropTypes } from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableCells from './TableCells'
import TableCell from '@mui/material/TableCell'

function Tables(props) {
  return (
    <div style={{ marginTop: '1em' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: 'primary.light' }} aria-label='simple table'>
          {props.id == 'nutritionTable' && (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Calories</TableCell>
                  <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                  <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                  <TableCell align='right'>Protein&nbsp;(g)</TableCell>
                  <TableCell align='right'>Serving size&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.items.map((item, index) => (
                  <TableCells id={props.id} key={index} items={item} />
                ))}
              </TableBody>
            </>
          )}
          {props.id == 'activityTable' && (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Calories</TableCell>
                  <TableCell align='right'>Activity&nbsp;Time&nbsp;length&nbsp;(mins)</TableCell>
                  <TableCell align='right'>Activity&nbsp;Length&nbsp;(km)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.items.map((item, index) => (
                  <TableCells id={props.id} key={index} items={item} />
                ))}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}

Tables.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default Tables
