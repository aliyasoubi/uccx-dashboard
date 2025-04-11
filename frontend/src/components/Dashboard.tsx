import React, { useEffect } from 'react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMetrics } from '../store/features/uccxSlice';
import { io } from 'socket.io-client';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { currentMetrics, loading, error } = useSelector((state: RootState) => state.uccx);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('uccx-update', (data) => {
      dispatch(setMetrics(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card style={{ width: 300 }}>
          <p style={{ color: 'red' }}>{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Calls"
              value={currentMetrics?.metrics.activeCalls || 0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Average Wait Time"
              value={currentMetrics?.metrics.averageWaitTime || 0}
              suffix="seconds"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Queue Size"
              value={currentMetrics?.metrics.queueSize || 0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '24px' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={currentMetrics ? [currentMetrics] : []}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="metrics.activeCalls" stroke="#3f8600" name="Active Calls" />
            <Line type="monotone" dataKey="metrics.averageWaitTime" stroke="#cf1322" name="Wait Time (s)" />
            <Line type="monotone" dataKey="metrics.queueSize" stroke="#1890ff" name="Queue Size" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard; 