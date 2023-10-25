import { AppAction, Dispatch, RootState } from '../../app/store';
import {
  apiGetTransactions,
  apiSaveNewTransaction,
  apiUpdateTransaction,
  apiDeleteTransaction,
  TransactionSaveData,
} from '../../app/api';

import {
  addTransaction as addTransactionState,
  updateTransaction as updateTransactionState,
  setTransactions as setTransactionsState,
  deleteTransaction as deleteTransactionState,
} from './slice';

import {
  updateAccount as updateAccountState,
} from '../accounts/slice';
import { TransactionsAPI } from './types';

const updateAccountBalance = (state: RootState, newTransaction: TransactionsAPI, dispatch: Dispatch) => {
  const { accounts } = state.accounts;
  const { accountName, type, value } = newTransaction;
  const connectedAccount = accounts.find((account) => account.name === accountName);
  if (connectedAccount) {
    const { id, balance } = connectedAccount;
    dispatch(updateAccountState({
      id: id, newAccount: {
        ...connectedAccount,
        balance: type === 'income' ? balance + value : balance - value

      }
    }))
  }
}

export const fetchTransactions = (): AppAction<Promise<void>> => (dispatch) => {
  return apiGetTransactions().then((transactionsList) => {
    dispatch(setTransactionsState(transactionsList));
  });
};

export const addTransaction =
  (data: TransactionSaveData): AppAction<Promise<void>> =>
    (dispatch, getState) => {
      return apiSaveNewTransaction(data).then((newTransaction) => {
        if (newTransaction) {
          updateAccountBalance(getState() as RootState, newTransaction, dispatch as Dispatch);
          dispatch(addTransactionState(newTransaction));
        }
      });
    };

export const updateTransaction =
  (id: string, data: Partial<TransactionSaveData>): AppAction<Promise<void>> =>
    (dispatch, getState) => {
      return apiUpdateTransaction(id, data).then((newTransaction) => {
        if (newTransaction) {
          dispatch(updateTransactionState({ id: newTransaction.id, newTransaction }));
        }
      });
    };

export const deleteTransaction =
  (id: string): AppAction<Promise<void>> =>
    (dispatch) => {
      return apiDeleteTransaction(id).then(() => {
        dispatch(deleteTransactionState(id));
      });
    };
