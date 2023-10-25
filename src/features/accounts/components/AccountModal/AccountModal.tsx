import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Input, message, ColorPicker, InputNumber } from 'antd';
import { getAccounts } from '../../selectors';
import { addAccount, updateAccount } from '../../actions';
import { Dispatch } from '../../../../app/store';

interface AccountModalProps {
  isOpenModal: boolean;
  closeModal: () => any;
  id?: string;
  name?: string;
  balance?: string;
  color?: string;
}

interface ColorObject {
  metaColor: {
    r: number;
    g: number;
    b: number;
  };
}

interface AccountFormData {
  name: string;
  balance: string;
  color: string | ColorObject;
}

const objectRgbToHex = (objectRgb: ColorObject) => {
  const { r, g, b } = objectRgb.metaColor;
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

export const AccountModal = ({
  isOpenModal,
  closeModal,
  id,
  name = '',
  balance = '',
  color = '#1677FF',
}: AccountModalProps) => {
  const dispatch = useDispatch<Dispatch>();
  const accounts = useSelector(getAccounts);

  const [form] = Form.useForm();
  const onValid = () => {
    const formData = form.getFieldsValue() as AccountFormData;
    const data = {
      color: typeof formData.color === 'string' ? formData.color : objectRgbToHex(formData.color),
      balance: parseFloat(formData.balance),
      name: formData.name,
    };

    if (id) {
      dispatch(updateAccount(id, data)).then(() => {
        message.success('Account updated!');
        closeModal();
        form.resetFields();
      });
    } else {
      dispatch(addAccount(data)).then(() => {
        message.success('Account saved!');
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
      title={id ? `Edit account` : `New account`}
      open={isOpenModal}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      closable
      className="custom-modal"
    >
      <Form form={form} layout="vertical" onFinish={onValid} autoComplete="off">
        <Form.Item label="" name="color" initialValue={color} rules={[{ required: true }]}>
          <ColorPicker showText={() => <span>Choose color</span>} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Account name"
          initialValue={name}
          rules={[
            {
              required: true,
              message: 'Please enter an account name!',
            },
            {
              validator: async (_, value) => {
                if (!id) {
                  const isNameUnique = accounts.every((account: any) => account.name !== value);
                  if (!isNameUnique) {
                    throw new Error('Account name must be unique!');
                  }
                }
              },
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="balance"
          label="Current balance ($)"
          initialValue={balance}
          rules={[{ required: true }]}
        >
          <InputNumber placeholder="Balance" className="account__input-number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
