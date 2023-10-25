import { AnyAction } from 'redux'
import {
  AccountsAPI
} from '../types'

import { SET_ACCOUNTS, ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from './types'


interface InitialState {
  accounts: AccountsAPI[]
}
const initialState: InitialState = {
  accounts: []
}

export const accountsReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_ACCOUNTS: {
      return {
        ...state,
        accounts: payload
      };
    }
    case ADD_ACCOUNT: {
      return {
        ...state,
        accounts: [payload, ...state.accounts]
      };
    }
    case UPDATE_ACCOUNT: {
      const { id, newAccount } = payload
      return {
        ...state,
        accounts: state.accounts.map((item) => {
          if (item.id === id) {
            return newAccount;
          }
          return item;
        }),
      };
    }
    case DELETE_ACCOUNT: {
      return {
        ...state,
        accounts: state.accounts.filter((item) => item.id !== payload)
      }
    }
    default:
      return state;
  }
}
