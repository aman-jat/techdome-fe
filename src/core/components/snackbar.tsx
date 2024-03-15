import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import store, { useAppSelector } from '../redux/store'

const SnackMessage = () => {
  const snackProps = useAppSelector((state) => state.snackbar)

  const snackClose = () => {
    store.dispatch({ type: 'snackbar/insert', payload: null })
  }
  const message = snackProps?.message === 'undefined: Unknown error' ? 'Server is offline' : snackProps?.message
  return (
    <>
      {!!snackProps && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={snackClose}
          anchorOrigin={snackProps?.anchorOrigin || { vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={snackClose}
            severity={snackProps?.severity || 'error'}
            sx={{ width: '100%', fontWeight: 500, fontSize: 16 }}
          >
            {message ?? ''}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default SnackMessage
