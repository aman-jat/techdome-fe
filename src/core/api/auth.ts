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
    ;['user', 'loans'].forEach((type) => {
      store.dispatch({ type: `${type}/clear` })
    })
    await ajax('auth/logout', { dispatch: 'user/clear' })
  },
  getMember: async () => {
    return await ajax('member/me', { dispatch: 'user/insert' })
  }
}

export default auth
