import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, List, Avatar, Dropdown, Button, Modal } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { HistoryModal } from '../.';
import { Dispatch } from '../../store';
import { deleteTransaction } from '../../store/actions';

import './HistoryListItem.css';

interface HistoryListItemProps {
  id: string;
  title: string;
  text: string;
  balance: number;
  isIncome: boolean;
}

export const HistoryListItem = ({
  id,
  title,
  text,
  balance,
  isIncome = false,
}: HistoryListItemProps) => {
  const dispatch = useDispatch<Dispatch>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const menuItems = [
    {
      key: '1',
      label: 'Change',
      onClick: () => setIsEditModalVisible(true),
    },
    {
      key: '2',
      label: 'Delete',
      danger: true,
      onClick: () => {
        Modal.confirm({
          title: 'Delete transaction?',
          icon: <ExclamationCircleOutlined />,
          content: 'It will be impossible to undo the deletion',
          cancelText: 'Cancel',
          okText: 'Delete',
          onOk() {
            return dispatch(deleteTransaction(id));
          },
          onCancel() {},
        });
      },
    },
  ];

  return (
    <>
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://joesch.moe/api/v1/random/?${Math.random()}`} />}
          title={title}
          description={text}
        />
        <div className="history-list-item__extra">
          <Dropdown menu={{ items: menuItems }}>
            <Button size="small" shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
          <Typography.Text type={isIncome ? 'success' : 'danger'}>
            {isIncome ? '+' : '-'}
            {balance} $
          </Typography.Text>
        </div>
      </List.Item>

      <HistoryModal
        id={id}
        balance={balance}
        title={title}
        text={text}
        isIncome={isIncome}
        closeModal={() => setIsEditModalVisible(false)}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};
