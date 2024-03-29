import store from '../redux/store'

type GetErrorMsg = (error: unknown) => string
export const getErrorMsg: GetErrorMsg = (error) => {
  let message: string = ''
  if (error instanceof Error) message = error.message
  if ((error as any)?.error) message = (error as any).error
  if (typeof error === 'string') message = error
  if (!message || message.length === 0) message = 'Something went wrong! Try again later.'
  return message
}

export const formatDate = (date: string | Date) => {
  const _date = typeof date === 'string' ? new Date(date) : date
  return _date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const showSnackbar = (
  err: string,
  options?: {
    severity: 'error' | 'warn' | 'info' | 'success'
  }
) => {
  store.dispatch({
    type: 'snackbar/insert',
    payload: {
      message: getErrorMsg(err),
      ...(options ?? {})
    }
  })
}
