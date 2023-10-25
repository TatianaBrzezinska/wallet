import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'antd';

import { getTransactions } from '../../store/selectors';
import { HistoryHeader, HistoryListItem } from '../.';
import { fetchTransactions } from '../../store/actions';
import { Dispatch } from '../../store';

import './History.css';

export const History = () => {
  const dispatch = useDispatch<Dispatch>();
  const transactions = useSelector(getTransactions);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchTransactions()).then(() => setLoader(false));

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
            renderItem={(item: any) => (
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
