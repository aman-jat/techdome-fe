import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './core/redux/store'
import theme from './core/styles/theme'
import SnackMessage from './core/components/snackbar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <SnackMessage />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
)
