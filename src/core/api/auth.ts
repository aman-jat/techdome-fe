import store from '../redux/store'
import ajax from './ajax'

const auth = {
  login: async (payload: { email: string; password: string }) => {
    return await ajax('auth/login', {
      method: 'POST',
      data: payload,
      dispatch: 'user/insert'
    })
  },
  register: async (payload: { name: string; role: string; email: string; password: string }) => {
    return await ajax('auth/register', {
      method: 'POST',
      data: payload,
      dispatch: 'user/insert'
    })
  },
  logout: async () => {
    const win = window as any
    const states = ['user', 'loans']
    states.forEach((type) => {
      store.dispatch({ type: `${type}/clear` })
    })
    await ajax('auth/logout', { dispatch: 'user/clear' })
    win.localStorage.removeItem('token')
    win.location.href = '/'
    win.location.reload()
  },
  getMember: async () => {
    return await ajax('member/me', { dispatch: 'user/insert', showError: false })
  }
}

export default auth
