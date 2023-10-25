import { configureStore, ThunkAction, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import accountsReducer from '../features/accounts/slice'
import transactionsReducer from '../features/transactions/slice'

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    transactions: transactionsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppAction<R> = ThunkAction<R, unknown, unknown, AnyAction>;
