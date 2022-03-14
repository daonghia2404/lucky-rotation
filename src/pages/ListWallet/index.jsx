import React, { useCallback, useEffect } from 'react';
import { Layout, Table } from 'antd';
import moment from 'moment';
import { getListWalletAction } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { EListWalletAction } from '@/redux/actions/list-wallet/constants';

const { Header } = Layout;

const Users = () => {
  const dispatch = useDispatch();

  const listWalletData = useSelector((state) => state.listWalletState.listWallet);
  const getListWalletLoading = useSelector((state) => state.loading[EListWalletAction.GET_LIST_WALLET]);

  const dataSources = listWalletData?.payload || [];

  const dataColumns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      render: (value) => value || '-',
    },
    {
      key: 'wallet_code',
      dataIndex: 'wallet_code',
      title: 'Wallet Code',
      render: (value) => value || '-',
    },
    {
      key: 'recharge_code',
      dataIndex: 'recharge_code',
      title: 'Recharge Code',
      render: (value) => value || '-',
    },
    {
      key: 'full_name',
      dataIndex: 'full_name',
      title: 'Full Name',
      render: (value) => value || '-',
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Amount',
      render: (value) => value || '-',
    },
    {
      key: 'account_number',
      dataIndex: 'account_number',
      title: 'Account Number',
      render: (value) => value || '-',
    },
    {
      key: 'bank_name',
      dataIndex: 'bank_name',
      title: 'Bank Name',
      render: (value) => value || '-',
    },
    {
      key: 'account_name',
      dataIndex: 'account_name',
      title: 'Account Name',
      render: (value) => value || '-',
    },
    {
      key: 'status_name',
      dataIndex: 'status_name',
      title: 'Status',
      render: (value) => value || '-',
    },
    {
      key: 'created_date',
      dataIndex: 'created_date',
      title: 'Created Date',
      render: (value) => (value ? moment(value).format('MM/DD/YYYY') : '-'),
    },
  ];

  const getListWalletData = useCallback(() => {
    dispatch(getListWalletAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getListWalletData();
  }, [getListWalletData]);

  return (
    <div className="Users">
      <Header>List Wallet</Header>
      <div className="Admin-body">
        <Table
          pagination={false}
          loading={getListWalletLoading}
          scroll={{ x: 'scroll' }}
          columns={dataColumns}
          dataSource={dataSources}
        />
      </div>
    </div>
  );
};

export default Users;
