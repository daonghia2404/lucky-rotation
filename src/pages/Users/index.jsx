import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Avatar, Button, Dropdown, Layout, Menu, Table } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';

import ModalConfirm from '@/components/ModalConfirm';
import { deleteUserAction, getAllUsersAction } from '@/redux/actions';
import { EUserAction } from '@/redux/actions/user/constants';
import UserDetailModal from '@/containers/UserDetailModal';
import { ETypeUserDetailModal } from '@/containers/UserDetailModal/UserDetailModal.data';
import { showNotification } from '@/utils/functions';
import { ETypeNotification } from '@/utils/constants';

const { Header } = Layout;

const Users = () => {
  const dispatch = useDispatch();
  const [deleteUserModalState, setDeleteUserModalState] = useState({
    visible: false,
    data: undefined,
  });
  const [userDetailModalState, setUserDetailModalState] = useState({
    visible: false,
    data: undefined,
    type: undefined,
  });

  const usersData = useSelector((state) => state.userState.users);
  const getUsersLoading = useSelector((state) => state.loading[EUserAction.GET_ALL_USERS]);
  const deleteUserLoading = useSelector((state) => state.loading[EUserAction.DELETE_USER]);

  const dataSources = usersData?.payload || [];

  const handleOpenDeleteUserModal = (data) => {
    setDeleteUserModalState({
      visible: true,
      data,
    });
  };

  const handleCloseDeleteUserModal = () => {
    setDeleteUserModalState({
      visible: false,
    });
  };

  const handleSubmitDeleteUserModal = () => {
    dispatch(
      deleteUserAction.request(
        deleteUserModalState.data.id,
        deleteUserModalState.data.user_code,
        handleDeleteUserSuccess,
      ),
    );
  };

  const handleDeleteUserSuccess = () => {
    showNotification(ETypeNotification.SUCCESS, 'Delete User Successfully');
    handleCloseDeleteUserModal();
    getUsersData();
  };

  const dropdownMenu = (record) => (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={() => handleOpenUserDetailModal(ETypeUserDetailModal.UPDATE, record)}>
        Edit
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} danger onClick={() => handleOpenDeleteUserModal(record)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const dataColumns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      render: (value, record) => <Avatar src={value}>{record.full_name}</Avatar>,
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      render: (value) => value || '-',
    },
    {
      key: 'user_code',
      dataIndex: 'user_code',
      title: 'User Code',
      render: (value) => value || '-',
    },
    {
      key: 'full_name',
      dataIndex: 'full_name',
      title: 'Full Name',
      render: (value) => value || '-',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
      render: (value) => value || '-',
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: 'Phone',
      render: (value) => value || '-',
    },
    {
      key: 'gender',
      dataIndex: 'gender',
      title: 'Gender',
      render: (value) => {
        switch (value) {
          case '00':
            return '-';
          case '01':
            return 'Male';
          case '02':
            return 'Female';
          default:
            return '-';
        }
      },
    },
    {
      key: 'birthday',
      dataIndex: 'birthday',
      title: 'Birthday',
      render: (value) => (value ? moment(value).format('MM/DD/YYYY') : '-'),
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Address',
      render: (value) => value || '-',
    },
    {
      key: 'province',
      dataIndex: 'province',
      title: 'Province',
      render: (value) => value || '-',
    },
    {
      key: 'coin',
      dataIndex: 'coin',
      title: 'Coin',
      render: (value) => value || '-',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
      render: (value) => {
        switch (value) {
          case '01':
            return 'Customer';
          case '99':
            return 'Admin';
          default:
            return '-';
        }
      },
    },
    {
      key: 'more',
      dataIndex: 'more',
      render: (value, record) => (
        <Dropdown trigger={['click']} overlay={dropdownMenu(record)}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const handleOpenUserDetailModal = (type, data) => {
    setUserDetailModalState({
      visible: true,
      data,
      type,
    });
  };

  const handleCloseUserDetailModal = () => {
    setUserDetailModalState({
      visible: false,
      data: undefined,
      type: undefined,
    });
  };

  const getUsersData = useCallback(() => {
    dispatch(getAllUsersAction.request({}));
  }, [dispatch]);

  const handleSubmitSuccess = () => {
    getUsersData();
    handleCloseUserDetailModal();
  };

  useEffect(() => {
    getUsersData();
  }, [getUsersData]);

  return (
    <div className="Users">
      <Header>Users</Header>
      <div className="Admin-body">
        <div className="Users-header flex justify-end" style={{ marginBottom: 24 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenUserDetailModal(ETypeUserDetailModal.CREATE)}
          >
            Add User
          </Button>
        </div>
        <Table
          pagination={false}
          scroll={{ x: 'scroll' }}
          columns={dataColumns}
          dataSource={dataSources}
          loading={getUsersLoading}
        />
      </div>

      <ModalConfirm
        title="Delete User"
        content="Are you sure want to delete this user? This action will be undone!"
        visible={deleteUserModalState.visible}
        onClose={handleCloseDeleteUserModal}
        onSubmit={handleSubmitDeleteUserModal}
        loading={deleteUserLoading}
      />

      <UserDetailModal {...userDetailModalState} onClose={handleCloseUserDetailModal} onSubmit={handleSubmitSuccess} />
    </div>
  );
};

export default Users;
