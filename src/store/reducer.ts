import { combineReducers } from "redux";
import { accountsReducer } from './accountsReducer'
import { transactionsReducer } from './transactionsReducer'

export const reducer = combineReducers({
  accounts: accountsReducer,
  transactions: transactionsReducer
})
