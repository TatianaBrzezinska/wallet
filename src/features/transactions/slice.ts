import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionsAPI } from './types'


interface InitialState {
  transactions: TransactionsAPI[]
}
const initialState: InitialState = {
  transactions: []
}

const TransactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionsAPI>) => {
      state.transactions.unshift(action.payload)
    },
    updateTransaction: (state, action: PayloadAction<{ id: TransactionsAPI['id'], newTransaction: TransactionsAPI }>) => {
      const { id, newTransaction } = action.payload;
      state.transactions = state.transactions.map((item) => {
        if (item.id === id) {
          return newTransaction;
        }
        return item;
      })
    },
    setTransactions: (state, action: PayloadAction<TransactionsAPI[]>) => {
      state.transactions = action.payload;
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((item) => item.id !== action.payload)
    }
  }
})


export const { addTransaction, updateTransaction, setTransactions, deleteTransaction } = TransactionsSlice.actions
export default TransactionsSlice.reducer
