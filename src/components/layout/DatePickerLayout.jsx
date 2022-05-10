import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import { DateTimePicker } from '@mui/lab'

function DatePickerLayout({
  label,
  value,
  variant,
  onChange,
  disabled,
  readOnly,
  helperText,
  inputFormat,
  fullWidth,
  style,
  views
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        views={views}
        ampm={false}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        inputFormat={inputFormat}
        readOnly={readOnly}
        renderInput={(params) => (
          <div>
            <TextField
              {...params}
              variant={variant}
              margin='dense'
              fullWidth={fullWidth}
              sx={style}
              helperText={helperText}
            />
          </div>
        )}
      />
    </LocalizationProvider>
  )
}

export default DatePickerLayout
