import React, { useEffect } from 'react';

import { Form, InputNumber, Modal } from 'antd';
import { showNotification, validationRules } from '@/utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { EListRotationAction } from '@/redux/actions/list-rotation/constants';
import { ETypeNotification } from '@/utils/constants';
import { updateRotationAction } from '@/redux/actions';

const RotationDetailModal = ({ visible, data, onSubmit, onClose }) => {
  const dispatch = useDispatch();

  const updateRotationLoading = useSelector((state) => state.loading[EListRotationAction.UPDATE_ROTATION]);

  const loading = updateRotationLoading;

  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  const handleSubmit = async () => {
    const submitValues = await form.validateFields();

    const body = {
      id: data.id,
      rotation_code: data.rotation_code,
      ...submitValues,
    };

    dispatch(updateRotationAction.request(body, handleActionRotationSuccess));
  };

  const handleActionRotationSuccess = () => {
    showNotification(ETypeNotification.SUCCESS, 'Update Rotation Successfully');
    onSubmit?.();
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Modal
      visible={visible}
      title="Edit Rotation"
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText="Submit"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Rate" name="rate" rules={[validationRules.required()]} required>
          <InputNumber placeholder="Please Enter Rate Of Rotation" />
        </Form.Item>
        <Form.Item label="Random Rate" name="random_rate" rules={[validationRules.required()]} required>
          <InputNumber placeholder="Please Enter Random Rate Of Rotation" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RotationDetailModal;
