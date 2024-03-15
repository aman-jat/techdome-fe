import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { reducerBuilder } from 'riducers'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Loan, User } from '../types/types'

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

export type RootState = {
  user: User
  loans: Loan[] | null
  ui: any
}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
