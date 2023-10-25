import { Timestamp } from "firebase/firestore";

export type TransactionType = "income" | "outcome";

export interface TransactionsAPI {
  id: string;
  name: string;
  value: number;
  type: TransactionType;
  accountName: string;
  created: Timestamp;
}
