import React from 'react';

import { Modal } from 'antd';

import './ModalConfirm.scss';

const ModalConfirm = ({ visible, loading, title, onClose, onSubmit, content, okText = 'Confirm' }) => {
  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onClose}
      onOk={onSubmit}
      okText={okText}
      confirmLoading={loading}
      wrapClassName="ModalConfirm-overlay"
    >
      <div className="ModalConfirm-content">{content}</div>
    </Modal>
  );
};

export default ModalConfirm;
