import React, { useEffect } from 'react';

import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { ETypeUserDetailModal } from '@/containers/UserDetailModal/UserDetailModal.data';
import { showNotification, validationRules } from '@/utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { EUserAction } from '@/redux/actions/user/constants';
import { createUserAction, updateUserAction } from '@/redux/actions';
import { ETypeNotification } from '@/utils/constants';
import moment from 'moment';

const UserDetailModal = ({ type, visible, data, onSubmit, onClose }) => {
  const dispatch = useDispatch();

  const createUserLoading = useSelector((state) => state.loading[EUserAction.CREATE_USER]);
  const updateUserLoading = useSelector((state) => state.loading[EUserAction.UPDATE_USER]);

  const loading = createUserLoading || updateUserLoading;

  const isCreateUser = type === ETypeUserDetailModal.CREATE;
  const isUpdateUser = type === ETypeUserDetailModal.UPDATE;

  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  const handleSubmit = async () => {
    await form.submit();

    const submitValues = form.getFieldsValue();
    const values = {
      ...submitValues,
      gender: submitValues?.gender?.value,
      birthday: submitValues?.birthday ? moment(submitValues?.birthday).format('YYYY-MM-DD') : undefined,
    };

    if (isCreateUser) {
      const body = values;
      dispatch(createUserAction.request(body, handleActionUserSuccess));
    }

    if (isUpdateUser) {
      const body = { ...data, ...values };
      dispatch(updateUserAction.request(body.id, body, handleActionUserSuccess));
    }
  };

  const handleActionUserSuccess = () => {
    showNotification(ETypeNotification.SUCCESS, isCreateUser ? 'Create User Successfully' : 'Update User Successfully');
    onSubmit?.();
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  // "full_name": "User1",
  // "phone": "092372323",
  // "email": "user@gmail.com",
  // "gender": "01",
  // "birthday": "1992-10-20",
  // "address": "dia chi",
  // "province": "Ha noi"

  // "id": 5,
  // "user_code": "CDAG4084IKV0",
  // "password": "123456",

  return (
    <Modal
      visible={visible}
      title={`${isCreateUser ? 'Create' : 'Edit'} User`}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText="Submit"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Full Name" name="full_name" required rules={[validationRules.required()]}>
          <Input placeholder="Please Enter Your Full Name" />
        </Form.Item>
        <Form.Item label="Email" name="email" required rules={[validationRules.required(), validationRules.email()]}>
          <Input placeholder="Please Enter Your Email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" placeholder="Please Enter Your Password" />
        </Form.Item>
        <Form.Item label="Phone" name="phone" required rules={[validationRules.required()]}>
          <Input placeholder="Please Enter Your Phone" />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select
            labelInValue
            placeholder="Please Choose Your Gender"
            defaultValue={{ label: 'Unknown', value: '00' }}
            options={[
              { label: 'Unknown', value: '00' },
              { label: 'Male', value: '01' },
              { label: 'Female', value: '02' },
            ]}
          />
        </Form.Item>
        <Form.Item label="Birthday" name="birthday">
          <DatePicker format="YYYY-MM-DD" placeholder="Please Choose Your Birthday" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input placeholder="Please Enter Your Address" />
        </Form.Item>
        <Form.Item label="Province" name="province">
          <Input placeholder="Please Enter Your Province" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDetailModal;
