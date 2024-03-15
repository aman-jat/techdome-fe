import axios from 'axios'
import { showSnackbar } from '../lib/lib'
import store from '../redux/store'

type AjaxOptions = {
  dispatch?: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: any
  prefix?: string
  headers?: any
  showError?: boolean
}

const ajax = async function (
  path: string,
  { dispatch, method = 'GET', data = null, prefix = '/api/', headers = {}, showError = true }: AjaxOptions
): Promise<any> {
  try {
    let config = {
      method,
      url: `${prefix}${path}`,
      headers: { 'Content-Type': 'application/json', ...headers },
      params: undefined,
      data: undefined
    }
    if (data && Object.keys(data).length > 0) {
      if (method === 'GET') config.params = data
      else config.data = data
    }
    let resp = await axios(config)

    resp = resp.data
    if (dispatch) setTimeout(() => store.dispatch({ type: `${dispatch}`, payload: resp }), 0)
    return resp
  } catch (e: any) {
    if (dispatch)
      store.dispatch({
        type: 'ui/401',
        payload: { path, type: dispatch, method }
      })
    let status = e.response?.status
    let message = e.response?.data?.message || e.response?.data?.error || 'Unknown error'
    if (showError) showSnackbar(message, { severity: 'error' })
    throw new Error(`${status}: ${message}`)
  }
}
export default ajax
