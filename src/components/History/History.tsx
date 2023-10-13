import { useEffect, useState } from 'react';
import { List } from 'antd';

import { HistoryHeader, HistoryListItem } from '../index';
import { TransactionsAPI } from '../../types';
import { apiGetTransactions } from '../../api';

import './History.css';

export const History = () => {
  const [isLoading, setLoader] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsAPI[]>([]);

  useEffect(() => {
    setLoader(true);
    apiGetTransactions()
      .then(setTransactions)
      .finally(() => setLoader(false));
  }, []);

  return (
    <section className="history">
      <HistoryHeader />

      <div className="history__wrap">
        <div className="history__list">
          <List
            size="small"
            itemLayout="horizontal"
            loading={isLoading}
            dataSource={transactions}
            renderItem={(item) => (
              <HistoryListItem
                id={item.id}
                title={item.name}
                text={item.accountName}
                balance={item.value}
                isIncome={item.type === 'income'}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
};
