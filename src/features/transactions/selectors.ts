import { RootState } from '../../app/store';

export const getTransactions = (state: RootState) => state.transactions.transactions;
