import { AnyAction } from 'redux'
import {
  TransactionsAPI
} from '../types'

import { SET_TRANSACTIONS, ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from './types'


interface InitialState {
  transactions: TransactionsAPI[]
}
const initialState: InitialState = {
  transactions: []
}

export const transactionsReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_TRANSACTIONS: {
      return {
        ...state,
        transactions: payload
      };
    }
    case ADD_TRANSACTION: {
      return {
        ...state,
        transactions: [payload, ...state.transactions]
      };
    }
    case UPDATE_TRANSACTION: {
      const { id, newTransaction } = payload
      return {
        ...state,
        transactions: state.transactions.map((item) => {
          if (item.id === id) {
            return newTransaction;
          }
          return item;
        }),
      };
    }
    case DELETE_TRANSACTION: {
      return {
        ...state,
        transactions: state.transactions.filter((item) => item.id !== payload)
      }
    }
    default:
      return state;
  }
}
