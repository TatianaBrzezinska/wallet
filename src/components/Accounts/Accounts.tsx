import { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { apiGetAccounts } from '../../api';
import { AccountsAPI } from '../../types';
import { AccountItem, AccountsHeader } from '../index';

import './Accounts.css';

export const Accounts = () => {
  const [isLoading, setLoader] = useState(false);
  const [accounts, setAccounts] = useState<AccountsAPI[]>([]);

  useEffect(() => {
    setLoader(true);
    apiGetAccounts()
      .then(setAccounts)
      .finally(() => setLoader(false));
  }, []);

  if (isLoading) {
    return (
      <Spin>
        <section className="accounts-list-loader" />
      </Spin>
    );
  }

  return (
    <section className="accounts">
      <AccountsHeader />
      <div className="accounts-wrap">
        <div className="accounts-list">
          {accounts.map((item) => (
            <AccountItem
              key={item.id}
              id={item.id}
              balance={item.balance}
              name={item.name}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
