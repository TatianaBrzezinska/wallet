import { useEffect, useState, useContext } from 'react';
import { Spin } from 'antd';

import { Context } from '../../store/context';
import { apiGetAccounts } from '../../api';
import { AccountItem, AccountsHeader } from '../index';

import './Accounts.css';

export const Accounts = () => {
  const { accounts, setAccounts } = useContext(Context);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    apiGetAccounts()
      .then(setAccounts)
      .finally(() => setLoader(false));
    // eslint-disable-next-line
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
