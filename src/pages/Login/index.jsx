import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { loginAction } from '@/redux/actions';
import { LayoutPaths } from '@/pages/routers';
import { showNotification, validationRules } from '@/utils/functions';
import { ETypeNotification } from '@/utils/constants';
import { EAuthAction } from '@/redux/actions/auth/constants';
import ImageLogo from '@/assets/images/logo.png';

import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const loadingLogin = useSelector((state) => state.loading[EAuthAction.LOGIN]);

  const handleSubmit = (values) => {
    const body = {
      user_name: values.username,
      password: values.password,
    };

    dispatch(loginAction.request(body, handleLoginSuccess));
  };

  const handleLoginSuccess = () => {
    navigate(LayoutPaths.Admin);
    showNotification(ETypeNotification.SUCCESS, 'Login Successfully');
  };

  return (
    <div className="Login flex items-center justify-center">
      <Card>
        <div className="Login-logo text-center">
          <img src={ImageLogo} alt="" />
        </div>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Username" name="username" required rules={[validationRules.required()]}>
            <Input placeholder="Please Enter Username" />
          </Form.Item>
          <Form.Item label="Password" name="password" required rules={[validationRules.required()]}>
            <Input type="password" placeholder="Please Enter Password" />
          </Form.Item>
          <Button size="large" type="primary" htmlType="submit" loading={loadingLogin}>
            LOGIN
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
