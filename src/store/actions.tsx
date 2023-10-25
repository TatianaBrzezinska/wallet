import {
  apiGetAccounts,
  apiSaveNewAccount,
  apiUpdateAccount,
  apiDeleteAccount,
  AccountSaveData,
  apiGetTransactions,
  apiSaveNewTransaction,
  apiUpdateTransaction,
  apiDeleteTransaction,
  TransactionSaveData,
} from '../api';

import { AppAction } from '.';
import { AccountsAPI, TransactionsAPI } from '../types';
import {
  SET_ACCOUNTS,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  SET_TRANSACTIONS,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from './types';

export const addAccountState = (account: AccountsAPI) => ({ type: ADD_ACCOUNT, payload: account });
export const setAccountsState = (accounts: AccountsAPI[]) => ({
  type: SET_ACCOUNTS,
  payload: accounts,
});
export const updateAccountState = (id: AccountsAPI['id'], newAccount: AccountsAPI) => ({
  type: UPDATE_ACCOUNT,
  payload: { id, newAccount },
});
export const deleteAccountState = (id: AccountsAPI['id']) => ({
  type: DELETE_ACCOUNT,
  payload: id,
});
export const addTransactionState = (transaction: TransactionsAPI) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});
export const setTransactionsState = (transactions: TransactionsAPI[]) => ({
  type: SET_TRANSACTIONS,
  payload: transactions,
});
export const updateTransactionState = (id: TransactionsAPI['id'], newAccount: TransactionsAPI) => ({
  type: UPDATE_TRANSACTION,
  payload: { id, newAccount },
});
export const deleteTransactionState = (id: TransactionsAPI['id']) => ({
  type: DELETE_TRANSACTION,
  payload: id,
});

export const fetchAccounts = (): AppAction<Promise<void>> => (dispatch) => {
  return apiGetAccounts().then((accountsList) => {
    dispatch(setAccountsState(accountsList));
  });
};

export const addAccount =
  (data: AccountSaveData): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiSaveNewAccount(data).then((newAccount) => {
      if (newAccount) {
        dispatch(addAccountState(newAccount));
      }
    });
  };

export const updateAccount =
  (id: string, data: Partial<AccountSaveData>): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiUpdateAccount(id, data).then((newAccount) => {
      if (newAccount) {
        dispatch(updateAccountState(newAccount.id, newAccount));
      }
    });
  };

export const deleteAccount =
  (id: string): AppAction<Promise<void>> =>
  (dispatch) => {
    return apiDeleteAccount(id).then(() => {
      dispatch(deleteAccountState(id));
    });
  };

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
        dispatch(updateTransactionState(newTransaction.id, newTransaction));
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
