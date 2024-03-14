import store from '../redux/store'
import ajax from './ajax'

const auth = {
  login: async (payload: { email: string; password: string }) => {
    return await ajax('auth/login', {
      method: 'POST',
      data: payload,
      dispatch: 'auth/insert'
    })
  },
  logout: async () => {
    const win = window as any
    ;['user', 'loans'].forEach((type) => {
      store.dispatch({ type: `${type}/clear` })
    })
    document.cookie = '_subdomain' + '='
    await ajax('auth/logout', { dispatch: 'user/clear' })
    win.location.href = '/'
    win.location.reload()
  },
  getMember: async () => {
    return await ajax('member/me', { dispatch: 'user/insert' })
  }
}

export default auth
