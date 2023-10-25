import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountsAPI } from './types';

interface InitialState {
  accounts: AccountsAPI[]
}

const initialState: InitialState = {
  accounts: []
}

const AccountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<AccountsAPI>) => {
      state.accounts.unshift(action.payload)
    },
    updateAccount: (state, action: PayloadAction<{ id: AccountsAPI['id'], newAccount: AccountsAPI }>) => {
      const { id, newAccount } = action.payload;
      state.accounts = state.accounts.map((item) => {
        if (item.id === id) {
          return newAccount;
        }
        return item;
      })
    },
    setAccounts: (state, action: PayloadAction<AccountsAPI[]>) => {
      state.accounts = action.payload;
    },
    deleteAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter((item) => item.id !== action.payload)
    }
  }
})


export const { addAccount, updateAccount, setAccounts, deleteAccount } = AccountsSlice.actions
export default AccountsSlice.reducer
