import { RootState } from "../../app/store";

export const getAccounts = (state: RootState) => state.accounts.accounts;
