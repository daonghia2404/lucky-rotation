import React, { useCallback, useEffect } from 'react';
import { Button, Card, Form, Input, InputNumber, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigAction, updateConfigAction } from '@/redux/actions';
import { showNotification, validationRules } from '@/utils/functions';
import { ETypeNotification } from '@/utils/constants';
import { EConfigAction } from '@/redux/actions/config/constants';

const { Header } = Layout;

const Setting = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const configState = useSelector((state) => state.configState.config?.payload);
  const updateConfigLoading = useSelector((state) => state.loading[EConfigAction.UPDATE_CONFIG]);

  const handleSubmit = (values) => {
    const body = {
      id: '1',
      ...values,
    };

    dispatch(updateConfigAction.request(body, handleUpdateConfigSuccess));
  };

  const handleUpdateConfigSuccess = () => {
    showNotification(ETypeNotification.SUCCESS, 'Update Setting Successfully');
    getConfigData();
  };

  const getConfigData = useCallback(() => {
    dispatch(getConfigAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    if (configState) {
      form.setFieldsValue({
        spin_seconds: configState.spin_seconds,
        number: configState.number,
      });
    }
  }, [configState]);

  useEffect(() => {
    getConfigData();
  }, [getConfigData]);

  return (
    <div className="Setting">
      <Header>Setting</Header>
      <div className="Admin-body">
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Spin Seconds" name="spin_seconds" required rules={validationRules.required()}>
              <InputNumber placeholder="Please Enter Spin Seconds" />
            </Form.Item>
            <Form.Item label="Number Exploding Jars" name="number" required rules={validationRules.required()}>
              <InputNumber placeholder="Please Enter Number Exploding Jars" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" loading={updateConfigLoading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Setting;
