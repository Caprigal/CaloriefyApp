import { createTheme } from '@mui/material/styles'
import { green, grey, red, orange } from '@mui/material/colors'

const rawTheme = createTheme({
  palette: {
    primary: {
      light: '#b1b1d5',
      main: '#42426a',
      dark: '#39395c',
    },
    secondary: {
      light: '#fbfbfb',
      main: '#707070',
      dark: '#484848',
    },
    burn: {
      main: '#ff8484',
    },
    cons: {
      main: '#93ffb0',
    },
    warning: {
      light: orange[50],
      main: orange[500],
      dark: orange[700],
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700],
    },
  },
  input: {
    background: '#f1f1f1',
    '&:hover': {
      background: '#f00',
    },
  },
  typography: {
    fontFamily: "'Mukta', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
  },
  components: {
    // Name of the component
    MuiTabs: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: 'white',
          position: 'relative',
          /*'& div.MuiTabs-scroller': {
            '& .MuiTabs-flexContainer': {
              background: 'linear-gradient(45deg, #b1b1d5 30%, #42426a 90%)',
              borderRadius: 5,
            },
          },*/
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          zIndex: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          zIndex: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: '#39395c',
          color: '#b1b1d5',
        },
      },
    },
  },
})

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  zIndex: {
    appBar: 1300,
  },
  typography: {
    ...rawTheme.typography,
    h1: {
      ...rawTheme.typography.h1,
      color: rawTheme.palette.secondary.main,
      fontFamily: "'Bebas Neue', cursive",
      fontSize: '25pt',
      letterSpacing: '8px',
      textAlign: 'center',
      lineHeight: '2',
      marginBottom: '12px'
    },
    h2: {
      ...rawTheme.typography.h2,
      color: rawTheme.palette.text.primary,
      fontFamily: "'Bebas Neue', cursive",
      fontStyle: 'Italic',
      fontSize: '16pt',
      opacity: 1,
      '&:hover': {
        opacity: 0.9,
      },
    },
    h3: {
      ...rawTheme.typography.h3,
      color: rawTheme.palette.primary.dark,
      fontFamily: "'Bebas Neue', cursive",
      fontSize: '19pt',
      textAlign: 'center',
      lineHeight: '1.2',
    },
    h4: {
      ...rawTheme.typography.h4,
      color: rawTheme.palette.secondary.light,
      fontFamily: "'Bebas Neue', cursive",
      fontSize: '90pt',
      letterSpacing: '52px',
      textAlign: 'center',
      lineHeight: '1.5',
      left: '0',
      right: '0',
      top: '37px',
      position: 'absolute',
      fontStyle: 'italic',
      cursor: 'default',
      zIndex: '-2'
    },
    h6: {
      ...rawTheme.typography.h6,
      color: rawTheme.palette.primary.dark,
      fontWeight: 100,
      fontStyle: 'Italic',
      fontSize: '12pt',
    },
  },
}

export default theme
