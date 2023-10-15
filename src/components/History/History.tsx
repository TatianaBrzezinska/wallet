import { useEffect, useState, useContext } from 'react';
import { List } from 'antd';

import { Context } from '../../store/context';
import { HistoryHeader, HistoryListItem } from '../index';
import { apiGetTransactions } from '../../api';

import './History.css';

export const History = () => {
  const { transactions, setTransactions } = useContext(Context);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    apiGetTransactions()
      .then(setTransactions)
      .finally(() => setLoader(false));
    // eslint-disable-next-line
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
