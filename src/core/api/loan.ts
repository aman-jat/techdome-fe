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
  },
  repay: async (payload: { amount: number; id: number }) => {
    return await ajax(`loan/${payload.id}/repay`, {
      method: 'PUT',
      data: payload,
      dispatch: 'loans/insert'
    })
  },
  approve: async (payload: { id: number }) => {
    return await ajax(`loan/${payload.id}/approve`, {
      method: 'PUT',
      data: payload,
      dispatch: 'loans/insert'
    })
  }
}

export default auth
