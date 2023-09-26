import React from 'react';
import { Modal, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { LangNameSpace } from '../../../utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type ModalDeleteProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  customerName?: string;
};

const ModalDelete: React.FC<ModalDeleteProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  customerName = '',
}) => {
  const { t } = useTranslation(LangNameSpace.Common);
  return (
    <Modal
      title={t('modal.deleteCustomer')}
      open={isOpen}
      onOk={onConfirm}
      onCancel={onCancel}>
      <div className="flex gap-2">
        <ExclamationCircleOutlined className="text-yellow-500" />
        <p className="font-medium">{t('modal.deleteCustomerMessage')}</p>
      </div>
      <Tag color="default">{customerName}</Tag>
    </Modal>
  );
};

export default ModalDelete;
