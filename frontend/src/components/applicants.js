import React, { useState, useEffect } from 'react';
import {Table} from 'antd';
import axios from 'axios';

const Applicants = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/applicants')
          .then(response => {
            return response.data;
          })
          .then(content => {
            setData(content ? content : []);
          })
      }, []);

    const columns = [
        {
        title: 'İlan Durumu',
        dataIndex: 'applicant_status',
        key: 'applicant_status',
        },
        {
        title: 'İş Adı',
        dataIndex: 'job_title',
        key: 'job_title',
        },
        {
        title: 'Başvuran Kullanıcı',
        dataIndex: 'applicant_username',
        key: 'applicant_username',
        },
        {
        title: 'Başvuru Tarihi',
        dataIndex: 'applied_date',
        key: 'applied_date',
        },
    ];

    return (
        <>
            <h1>Başvurularım</h1>

            <Table pagination={{pageSize: 5}} dataSource={data} columns={columns} />;
        </>
    );
};

export default Applicants;

