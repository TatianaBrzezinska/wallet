import { RootState } from ".";

export const getAccounts = (state: RootState) => state.accounts.accounts;
export const getTransactions = (state: RootState) => state.transactions.transactions;
