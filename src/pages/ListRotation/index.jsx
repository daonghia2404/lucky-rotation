import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, Layout, Menu, Table } from 'antd';
import { getListRotationAction } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { EListRotationAction } from '@/redux/actions/list-rotation/constants';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import RotationDetailModal from '@/containers/RotationDetailModal';

const { Header } = Layout;

const Users = () => {
  const dispatch = useDispatch();

  const [rotationDetailModalState, setRotationDetailModalState] = useState({
    visible: false,
    data: undefined,
  });

  const listRotationData = useSelector((state) => state.listRotationState.listRotation);
  const getListRotationLoading = useSelector((state) => state.loading[EListRotationAction.GET_LIST_WALLET]);

  const dataSources = listRotationData?.payload || [];

  const handleOpenRotationDetailModal = (data) => {
    setRotationDetailModalState({
      visible: true,
      data,
    });
  };
  const handleCloseRotationDetailModal = () => {
    setRotationDetailModalState({
      visible: false,
    });
  };
  const handleSubmitRotationDetailModal = () => {
    getListRotationData();
    handleCloseRotationDetailModal();
  };

  const dropdownMenu = (record) => (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={() => handleOpenRotationDetailModal(record)}>
        Edit
      </Menu.Item>
    </Menu>
  );

  const dataColumns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      render: (value) => value || '-',
    },
    {
      key: 'rotation_code',
      dataIndex: 'rotation_code',
      title: 'Rotation Code',
      render: (value) => value || '-',
    },
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Image',
      render: (value) => (value ? <img src={value} alt="" /> : '-'),
    },
    {
      key: 'rate',
      dataIndex: 'rate',
      title: 'Full Name',
      render: (value) => value || '-',
    },
    {
      key: 'random_rate',
      dataIndex: 'random_rate',
      title: 'Amount',
      render: (value) => value || '-',
    },
    {
      key: 'more',
      dataIndex: 'more',
      width: 40,
      render: (value, record) => (
        <Dropdown trigger={['click']} overlay={dropdownMenu(record)}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const getListRotationData = useCallback(() => {
    dispatch(getListRotationAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getListRotationData();
  }, [getListRotationData]);

  return (
    <div className="Users">
      <Header>List Rotation</Header>
      <div className="Admin-body">
        <Table
          pagination={false}
          loading={getListRotationLoading}
          scroll={{ x: 'scroll' }}
          columns={dataColumns}
          dataSource={dataSources}
        />
      </div>

      <RotationDetailModal
        {...rotationDetailModalState}
        onClose={handleCloseRotationDetailModal}
        onSubmit={handleSubmitRotationDetailModal}
      />
    </div>
  );
};

export default Users;
