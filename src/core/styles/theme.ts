import { createTheme } from '@mui/material/styles'

const defaultTheme = createTheme()

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, sans-serif',
    body1: {
      [defaultTheme.breakpoints.only('xs')]: {
        fontSize: 18
      }
    },
    h3: {
      [defaultTheme.breakpoints.only('xs')]: {
        fontSize: 30
      }
    },
    h4: {
      [defaultTheme.breakpoints.only('xs')]: {
        fontSize: 24
      },
      [defaultTheme.breakpoints.only('sm')]: {
        fontSize: 28
      },
      [defaultTheme.breakpoints.only('md')]: {
        fontSize: 32
      },
      [defaultTheme.breakpoints.only('lg')]: {
        fontSize: 36
      },
      [defaultTheme.breakpoints.only('xl')]: {
        fontSize: 40
      }
    },
    subtitle1: {
      color: '#00000090'
    }
  },
  palette: {
    primary: {
      light: '#6189C4',
      main: '#28407D',
      dark: '#5475E1'
    }
    // secondary: {
    //   light: '#363A54',
    //   main: '#202541',
    //   dark: '#28407D'
    // },
    // common: {
    //   white: '#fff',
    //   black: '#000'
    // },
    // warning: {
    //   light: '#D4B04E',
    //   main: '#DABC69',
    //   dark: '#B49642'
    // },
    // info: {
    //   light: '#69C3DA',
    //   main: '#4EB9D4',
    //   dark: '#429DB4'
    // },
    // success: {
    //   light: '#61C471',
    //   main: '#45BA58',
    //   dark: '#3B9E4B'
    // },
    // text: {
    //   primary: '#28407D',
    //   secondary: '#1f3161',
    //   disabled: '#7F8D93'
    // },
    // background: {
    //   default: '#F4F7FB',
    //   paper: '#FFF'
    // },
    // divider: '#E7EBEF'
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#28407D'
        }
      }
    }
  }
})
export default theme
