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
  snackbar: reducerBuilder('snackbar', { stateType: 'static' })
})

const store = configureStore({
  reducer,
  devTools: true
})

export type RootState = {
  user: User
  loans: Loan[] | null
  snackbar: any
}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
