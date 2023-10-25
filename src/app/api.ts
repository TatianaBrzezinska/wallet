import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { message } from 'antd';
import { AccountsAPI } from "../features/accounts/types";
import { TransactionsAPI, TransactionType } from "../features/transactions/types";

export const initializeAPI = () => {
  initializeApp({
    apiKey: "AIzaSyBGBXnQMwVoyP_6daO8ZYO7LhN9SJXnpC4",
    authDomain: "wallet-8f2fa.firebaseapp.com",
    projectId: "wallet-8f2fa",
    storageBucket: "wallet-8f2fa.appspot.com",
    messagingSenderId: "584893139904",
    appId: "1:584893139904:web:9f7de6b87c4a2210b1d625",
    measurementId: "G-CLVQMKNQQX"
  });

  getFirestore();
};

export const apiGetAccount = async (id: string): Promise<AccountsAPI | null> => {
  const db = getFirestore();

  try {
    const querySnapshot = await getDoc(doc(db, "accounts", id));

    if (querySnapshot.exists()) {
      const data = querySnapshot.data() as Omit<AccountsAPI, "id">;

      return {
        id: querySnapshot.id,
        ...data
      };
    } else {
      return null;
    }
  } catch (error) { }

  return null;
};

export const apiGetAccounts = async (): Promise<AccountsAPI[]> => {
  const result: AccountsAPI[] = [];
  const db = getFirestore();
  try {
    const q = query(collection(db, "accounts"), orderBy("created", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<AccountsAPI, "id">;
      result.push({
        id: doc.id,
        ...data
      });
    });
  } catch (error) {
    message.error(error as string);
  }

  return result;
};

export interface AccountSaveData {
  name: string;
  balance: number;
  color: string;
}

export const apiSaveNewAccount = async (
  data: AccountSaveData
): Promise<AccountsAPI | null> => {
  const newDoc: Omit<AccountsAPI, "id"> = {
    ...data,
    created: Timestamp.now()
  };
  const db = getFirestore();

  try {
    const docRef = await addDoc(collection(db, "accounts"), newDoc);
    const doc = await apiGetAccount(docRef.id);

    if (doc !== null) {
      return doc;
    }
  } catch (error) {
    message.error(error as string);
  }

  return null;
};

export const apiUpdateAccount = async (
  id: string,
  data: Partial<AccountSaveData>
): Promise<AccountsAPI | null> => {
  const db = getFirestore();

  try {
    await updateDoc(doc(db, "accounts", id), {
      ...data
    });
    const updatedDoc = await apiGetAccount(id);

    if (doc !== null) {
      return updatedDoc;
    }
  } catch (error) {
    message.error(error as string);
  }

  return null;
};

export const apiDeleteAccount = async (id: string): Promise<void> => {
  const db = getFirestore();

  try {
    await deleteDoc(doc(db, "accounts", id));
  } catch (error) { }
};

export const apiGetTransaction = async (
  id: string
): Promise<TransactionsAPI | null> => {
  const db = getFirestore();

  try {
    const querySnapshot = await getDoc(doc(db, "transactions", id));

    if (querySnapshot.exists()) {
      const data = querySnapshot.data() as Omit<TransactionsAPI, "id">;

      return {
        id: querySnapshot.id,
        ...data
      };
    } else {
      return null;
    }
  } catch (error) {
    message.error(error as string);
  }

  return null;
};

export const apiGetTransactions = async (): Promise<TransactionsAPI[]> => {
  const result: TransactionsAPI[] = [];
  const db = getFirestore();

  try {
    const q = query(collection(db, "transactions"), orderBy("created", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<TransactionsAPI, "id">;

      result.push({
        id: doc.id,
        ...data
      });
    });
  } catch (error) {
    message.error(error as string);
  }

  return result;
};

export interface TransactionSaveData {
  name: string;
  value: number;
  type: TransactionType;
  accountName: string;
}

export const apiSaveNewTransaction = async (
  data: TransactionSaveData
): Promise<TransactionsAPI | null> => {
  const newDoc: Omit<TransactionsAPI, "id"> = {
    ...data,
    created: Timestamp.now()
  };
  const db = getFirestore();

  try {
    const docRef = await addDoc(collection(db, "transactions"), newDoc);
    const doc = await apiGetTransaction(docRef.id);

    if (doc !== null) {
      return doc;
    }
  } catch (error) {
    message.error(error as string);
  }

  return null;
};

export const apiUpdateTransaction = async (
  id: string,
  data: Partial<TransactionSaveData>
): Promise<TransactionsAPI | null> => {
  const db = getFirestore();

  try {
    await updateDoc(doc(db, "transactions", id), {
      ...data
    });
    const updatedDoc = await apiGetTransaction(id);

    if (doc !== null) {
      return updatedDoc;
    }
  } catch (error) {
    message.error(error as string);
  }

  return null;
};

export const apiDeleteTransaction = async (id: string): Promise<void> => {
  const db = getFirestore();

  try {
    await deleteDoc(doc(db, "transactions", id));
  } catch (error) { }
};
