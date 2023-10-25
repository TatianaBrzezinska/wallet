import { useState } from 'react';
import { Typography, Button } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import { AccountModal } from '../.';

import './AccountsHeader.css';

export const AccountsHeader = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="accounts-header">
        <Typography.Title>Your accounts</Typography.Title>
        <Button
          shape="circle"
          size="large"
          icon={<PlusOutlined />}
          onClick={showModal}
        />
      </div>

      <AccountModal closeModal={closeModal} isOpenModal={isModalVisible} />
    </>
  );
};
