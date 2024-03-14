import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h2: {}
  },
  palette: {
    primary: {
      light: '#6189C4',
      main: '#6A8CFB',
      dark: '#5475E1'
    },
    secondary: {
      light: '#363A54',
      main: '#202541',
      dark: '#28407D'
    },
    common: {
      white: '#fff',
      black: '#000'
    },
    warning: {
      light: '#D4B04E',
      main: '#DABC69',
      dark: '#B49642'
    },
    info: {
      light: '#69C3DA',
      main: '#4EB9D4',
      dark: '#429DB4'
    },
    success: {
      light: '#61C471',
      main: '#45BA58',
      dark: '#3B9E4B'
    },
    text: {
      primary: '#28407D',
      secondary: '#1f3161',
      disabled: '#7F8D93'
    },
    background: {
      default: '#F4F7FB',
      paper: '#FFF'
    },
    divider: '#E7EBEF'
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#28407D'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          letterSpacing: 0,
          textTransform: 'initial'
        },
        sizeSmall: {
          padding: '0 8px',
          height: '32px'
        },
        text: {
          fontSize: 16,
          color: '#28407D'
        }
      }
    }
  }
})
// @ts-ignore
window.theme = theme
export default theme
