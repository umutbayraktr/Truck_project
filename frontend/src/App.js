/*import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Jobs from './components/jobs';
import Applicants from './components/applicants';

const { Sider, Content } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme='light'>
          <Menu 
            theme="dark" 
            mode="inline" 
            selectedKeys={[selectedKey]} 
            onClick={handleMenuClick}
          >
            <Menu.Item key="1">
              <Link to="/jobs">İlanlar</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/applicants">Başvurularım</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to= "/profile">profilim</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="/" element={<Jobs />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/jobs" element={<Jobs />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
*/

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Button, message } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Applicants from './components/applicants';
import axios from 'axios';

const { Sider, Content } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme='light'>
          <Menu 
            theme="dark" 
            mode="inline" 
            selectedKeys={[selectedKey]} 
            onClick={handleMenuClick}
          >
            <Menu.Item key="1">
              <Link to="/jobs">İlanlar</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/applicants">Başvurularım</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/profile">Profilim</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px' }}>
            <Routes>
              <Route path="/" element={<Jobs />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/jobs" element={<Jobs />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const Jobs = () => {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/jobs')
      .then(response => {
        setData(response.data || []);
      });
  }, []);

  const handleApply = (jobId) => {
    const userId = 'your_user_id_here'; 
    axios.get(`http://localhost:4000/users/${userId}`)
      .then(response => {
        setUserInfo(response.data);
        message.success('Başvurunuz alındı!');
      })
      .catch(error => {
        message.error('Başvuru sırasında bir hata oluştu.');
      });
  };

  const columns = [
    {
      title: 'İlan Başlığı',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'İlan Açıklaması',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Başlangıç Lokasyonu',
      dataIndex: 'start_location',
      key: 'start_location',
    },
    {
      title: 'Varış Lokasyonu',
      dataIndex: 'end_location',
      key: 'end_location',
    },
    {
      title: 'Taşıma Tarihi',
      dataIndex: 'job_date',
      key: 'job_date',
    },
    {
      title: 'Ücret',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Başvur',
      key: 'apply',
      render: (text, record) => (
        <Button onClick={() => handleApply(record.id)}>Başvur</Button>
      ),
    },
  ];

  return (
    <>
      <h1>İlanlarım</h1>
      {userInfo && (
        <div>
          <h2>Kullanıcı Bilgileri</h2>
          <p>Email: {userInfo.email}</p>
          <p>Telefon: {userInfo.tel_no}</p>
        </div>
      )}
      <Table pagination={{ pageSize: 5 }} dataSource={data} columns={columns} />
    </>
  );
};

export default App;






