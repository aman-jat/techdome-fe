import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { reducerBuilder } from 'riducers'

const reducer = combineReducers({
  user: reducerBuilder('user', {}),
  loans: reducerBuilder('loans', {
    stateType: 'list',
    initialState: null
  }),
  ui: combineReducers({
    snackbar: reducerBuilder('ui/snackbar', { stateType: 'static' }),
    state: reducerBuilder('ui/state', { stateType: 'map', keyName: 'name' })
  })
})

const store = configureStore({
  reducer,
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
