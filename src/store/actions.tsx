import { useState } from 'react';
import { AccountsAPI, TransactionsAPI } from '../types';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<AccountsAPI[]>([]);

  return { accounts, setAccounts };
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionsAPI[]>([]);

  return { transactions, setTransactions };
};

export const useAppStore = () => {
  const accountsStore = useAccounts();
  const transactionsStore = useTransactions();

  return {
    ...accountsStore,
    ...transactionsStore,
  };
};
