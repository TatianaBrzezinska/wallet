import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, message, Radio, Select, InputNumber } from 'antd';

import { TransactionType } from '../../types';
import { getAccounts } from '../../../accounts/selectors';
import { addTransaction, updateTransaction } from '../../actions';
import { Dispatch } from '../../../../app/store';

interface HistoryModalProps {
  isOpenModal: boolean;
  closeModal: VoidFunction;
  id?: string;
  title?: string;
  text?: string;
  balance?: number;
  isIncome?: boolean;
}

interface TransactionFormData {
  name: string;
  value: string;
  type: TransactionType;
  accountName: string;
}

export const HistoryModal = ({
  isOpenModal,
  closeModal,
  id,
  title = '',
  text = '',
  balance = 0,
  isIncome = false,
}: HistoryModalProps) => {
  const dispatch = useDispatch<Dispatch>();
  const [form] = Form.useForm();
  const accounts = useSelector(getAccounts);

  const onValid = () => {
    const formData = form.getFieldsValue() as TransactionFormData;
    const data = {
      name: formData.name,
      value: parseFloat(formData.value),
      type: formData.type,
      accountName: formData.accountName,
    };

    if (id) {
      dispatch(updateTransaction(id, data)).then(() => {
        message.success('Transaction updated!');
        closeModal();
        form.resetFields();
      });
    } else {
      dispatch(addTransaction(data)).then(() => {
        message.success('Transaction saved!');
        closeModal();
        form.resetFields();
      });
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <Modal
      title={id ? `Edit operation` : `New operation`}
      open={isOpenModal}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      closable
      className="custom-modal"
    >
      <Form form={form} layout="vertical" onFinish={onValid} autoComplete="off">
        <Form.Item
          label="Type"
          name="type"
          initialValue={isIncome ? 'income' : 'outcome'}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio.Button value="income">Income</Radio.Button>
            <Radio.Button value="outcome">Outcome</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="name"
          label="Payment name"
          initialValue={title}
          rules={[{ required: true }]}
        >
          <Input placeholder="Products" />
        </Form.Item>
        <Form.Item
          name="accountName"
          label="Account"
          initialValue={text}
          rules={[{ required: true }]}
        >
          <Select placeholder="Choose the account">
            {accounts.map((item: any) => (
              <Select.Option key={item.id} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="value"
          label="Ammount ($)"
          initialValue={balance}
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="Ammount" className="account__input-number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
