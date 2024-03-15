import axios from 'axios'
import { showSnackbar } from '../lib/utils'
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
  { dispatch, method = 'GET', data = null, showError = true }: AjaxOptions
): Promise<any> {
  try {
    const config = {
      method,
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/api/${path}`,
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
      params: undefined,
      data: undefined,
      withCredentials: true
    }
    console.log('token-request', localStorage.getItem('token'))
    if (data && Object.keys(data).length > 0) {
      if (method === 'GET') config.params = data
      else config.data = data
    }
    let resp: any = await axios(config)
    resp = resp.data
    if (resp.hasOwnProperty('token')) {
      localStorage.setItem('token', resp.token)
      console.log('token-response', resp.token)
      resp = resp.member
    }
    if (dispatch) setTimeout(() => store.dispatch({ type: `${dispatch}`, payload: resp }), 0)
    return resp
  } catch (e: any) {
    // const status = e.response?.status
    const message = e.response?.data?.message || e.response?.data?.error || 'Unknown error'
    if (showError) showSnackbar(message, { severity: 'error' })
    throw new Error(message)
  }
}
export default ajax
