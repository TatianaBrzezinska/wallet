import { AppAction } from '../../app/store';
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

export const fetchTransactions = (): AppAction<Promise<void>> => (dispatch) => {
  return apiGetTransactions().then((transactionsList) => {
    dispatch(setTransactionsState(transactionsList));
  });
};

export const addTransaction =
  (data: TransactionSaveData): AppAction<Promise<void>> =>
    (dispatch) => {
      return apiSaveNewTransaction(data).then((newTransaction) => {
        if (newTransaction) {
          dispatch(addTransactionState(newTransaction));
        }
      });
    };

export const updateTransaction =
  (id: string, data: Partial<TransactionSaveData>): AppAction<Promise<void>> =>
    (dispatch) => {
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
