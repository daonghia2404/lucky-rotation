import React, { useCallback, useEffect } from 'react';
import { Layout, Table } from 'antd';
import moment from 'moment';
import { EHistoryRotationAction } from '@/redux/actions/history-rotation/constants';
import { getListHistoryRotationAction } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const { Header } = Layout;

const Users = () => {
  const dispatch = useDispatch();

  const historyRotationData = useSelector((state) => state.historyRotationState.historyRotation);
  const getHistoryRotationLoading = useSelector(
    (state) => state.loading[EHistoryRotationAction.GET_LIST_HISTORY_ROTATION],
  );

  const dataSources = historyRotationData?.payload || [];

  const dataColumns = [
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
      key: 'image',
      dataIndex: 'image',
      title: 'Collection',
      render: (value) => (value ? <img src={value} alt="" /> : '-'),
    },
    {
      key: 'is_win',
      dataIndex: 'is_win',
      title: 'Win',
      render: (value) => value || '-',
    },
    {
      key: 'bet_coin',
      dataIndex: 'bet_coin',
      title: 'Bet Coin',
      render: (value) => value || '-',
    },
    {
      key: 'result_coin',
      dataIndex: 'result_coin',
      title: 'Result Coin',
      render: (value) => value || '-',
    },
    {
      key: 'created_date',
      dataIndex: 'created_date',
      title: 'Created Date',
      render: (value) => (value ? moment(value).format('MM/DD/YYYY') : '-'),
    },
  ];

  const getHistoryRotationData = useCallback(() => {
    dispatch(getListHistoryRotationAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getHistoryRotationData();
  }, [getHistoryRotationData]);

  return (
    <div className="Users">
      <Header>History Rotation</Header>
      <div className="Admin-body">
        <Table
          pagination={false}
          loading={getHistoryRotationLoading}
          scroll={{ x: 'scroll' }}
          columns={dataColumns}
          dataSource={dataSources}
        />
      </div>
    </div>
  );
};

export default Users;
