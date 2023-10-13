import { useState } from 'react';
import { Typography, Button } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import { HistoryModal } from '../index';

import './HistoryHeader.css';

export const HistoryHeader = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <header className="history-header">
        <Typography.Title level={3}>History</Typography.Title>
        <Button shape="circle" icon={<PlusOutlined />} onClick={showModal} />
      </header>

      <HistoryModal closeModal={closeModal} isOpenModal={isModalVisible} />
    </>
  );
};
