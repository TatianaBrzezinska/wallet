import { Timestamp } from "firebase/firestore";

export interface AccountsAPI {
  id: string;
  balance: number;
  color: string;
  name: string;
  created: Timestamp;
}
