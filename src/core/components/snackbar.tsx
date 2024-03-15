import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

const SnackMessage = () => {
  const snackProps = useSelector((state: any) => state.ui?.snackbar)
  const dispatch = useDispatch()
  const snackClose = () => {
    dispatch({ type: 'ui/snackbar', payload: null })
  }
  return (
    <>
      {!!snackProps && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={snackClose}
          anchorOrigin={snackProps?.anchorOrigin || { vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={snackClose} severity={snackProps?.severity || 'error'} sx={{ width: '100%' }}>
            {snackProps?.message || ''}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default SnackMessage
