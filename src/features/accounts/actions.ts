import { AppAction } from '../../app/store';
import {
  apiGetAccounts,
  apiSaveNewAccount,
  apiUpdateAccount,
  apiDeleteAccount,
  AccountSaveData,
} from '../../app/api';

import {
  addAccount as addAccountState,
  updateAccount as updateAccountState,
  setAccounts as setAccountsState,
  deleteAccount as deleteAccountState,
} from './slice';


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
          dispatch(updateAccountState({ id: newAccount.id, newAccount }));
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

