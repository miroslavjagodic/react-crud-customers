import React from 'react';
import { Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

type ModalDeleteProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  textTitle?: string;
  textSubtitle?: string;
  textDetails?: string;
};

const ModalDelete: React.FC<ModalDeleteProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  textTitle = '',
  textSubtitle = '',
  textDetails = '',
}) => {
  return (
    <Modal
      title={textTitle}
      open={isOpen}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={(_, { OkBtn }) => <OkBtn />}>
      <div className="flex gap-2">
        <InfoCircleOutlined className="text-blue-500" />
        <p className="font-medium">{textSubtitle}</p>
      </div>
      <p className="m-0">{textDetails}</p>
    </Modal>
  );
};

export default ModalDelete;
