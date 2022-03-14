import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  ChromeOutlined,
  HistoryOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';

import ImageLogo from '@/assets/images/logo.png';

import './Sidebar.scss';
import AuthHelpers from '@/services/auth-helpers';
import { LayoutPaths, Paths } from '@/pages/routers';
import { navigate } from '@reach/router';
import ModalConfirm from '@/components/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { EAuthAction } from '@/redux/actions/auth/constants';
import { logoutAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { ETypeNotification } from '@/utils/constants';

const Sidebar = () => {
  const dispatch = useDispatch();

  const [visibleLogoutModal, setVisibleLogoutModal] = useState(false);
  const logoutLoading = useSelector((state) => state.loading[EAuthAction.LOGOUT]);

  const handleNavigate = (path) => {
    navigate(`${LayoutPaths.Admin}${path}`);
  };

  const handleOpenLogoutModal = () => {
    setVisibleLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setVisibleLogoutModal(false);
  };

  const handleLogout = () => {
    dispatch(logoutAction.request(handleLogoutSuccess));
  };

  const handleLogoutSuccess = () => {
    AuthHelpers.clearTokens();
    showNotification(ETypeNotification.SUCCESS, 'Logout Successfully');
    navigate(LayoutPaths.Auth);
  };

  return (
    <div className="Sidebar">
      <div className="Sidebar-logo">
        <img src={ImageLogo} alt="" />
      </div>
      <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="users" icon={<UserOutlined />} onClick={() => handleNavigate(Paths.Users)}>
          Users
        </Menu.Item>
        <Menu.Item key="list-wallet" icon={<WalletOutlined />} onClick={() => handleNavigate(Paths.ListWallet)}>
          List Wallet
        </Menu.Item>
        <Menu.Item key="list-rotation" icon={<ChromeOutlined />} onClick={() => handleNavigate(Paths.ListRotation)}>
          List Rotation
        </Menu.Item>
        <Menu.Item
          key="history-rotation"
          icon={<HistoryOutlined />}
          onClick={() => handleNavigate(Paths.HistoryRotation)}
        >
          History Rotation
        </Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />} onClick={() => handleNavigate(Paths.Setting)}>
          Setting
        </Menu.Item>

        <Menu.Item style={{ marginTop: 'auto' }} key="logout" icon={<LogoutOutlined />} onClick={handleOpenLogoutModal}>
          Logout
        </Menu.Item>
      </Menu>

      <ModalConfirm
        title="Logout"
        content="Are you sure want to logout this account?"
        loading={logoutLoading}
        visible={visibleLogoutModal}
        onClose={handleCloseLogoutModal}
        onSubmit={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
