import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './components/Dashboard';
import './App.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout className="layout">
          <Header className="header">
            <div className="logo">UCCX Dashboard</div>
          </Header>
          <Content className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App; 