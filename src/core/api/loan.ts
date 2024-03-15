import ajax from './ajax'

const auth = {
  getAll: async () => {
    return await ajax('loan', { dispatch: 'loans/replace' })
  },
  create: async (payload: { amount: number; tenure: number }) => {
    return await ajax('loan', {
      method: 'POST',
      data: payload,
      dispatch: 'loans/insert'
    })
  }
}

export default auth
