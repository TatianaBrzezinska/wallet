import { Timestamp } from "firebase/firestore";

export interface AccountsAPI {
  id: string;
  balance: number;
  color: string;
  name: string;
  created: Timestamp;
}

export type TransactionType = "income" | "outcome";

export interface TransactionsAPI {
  id: string;
  name: string;
  value: number;
  type: TransactionType;
  accountName: string;
  created: Timestamp;
}
