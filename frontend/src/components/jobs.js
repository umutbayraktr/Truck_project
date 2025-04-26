/*import React, { useState, useEffect } from 'react';
import {Table} from 'antd';
import axios from 'axios';

const Jobs = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/jobs')
          .then(response => {
            return response.data;
          })
          .then(content => {
            setData(content ? content : []);
          })
      }, []);

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
        }
    ];

    return (
        <>
            <h1>İlanlarım</h1>

            <Table pagination={{pageSize: 5}} dataSource={data} columns={columns} />;
        </>
    );
};

export default Jobs; */

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';  // Buton eklendi
import axios from 'axios';

const Jobs = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/jobs')
          .then(response => {
            return response.data;
          })
          .then(content => {
            setData(content ? content : []);
          })
      }, []);

    const handleApplyClick = (jobId) => {
        console.log(`Başvuru yapıldı. Job ID: ${jobId}`);
        // İleride buraya kullanıcı bilgilerini çekip başvuru işlemi yapacaksın
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
        title: 'İşlem',  // Yeni bir sütun ekledik
        key: 'action',
        render: (text, record) => (
            <Button type="primary" onClick={() => handleApplyClick(record.id)}>
              Başvuru Yap
            </Button>
        ),
        },
    ];

    return (
        <>
            <h1>İlanlarım</h1>
            <Table pagination={{ pageSize: 5 }} dataSource={data} columns={columns} />
        </>
    );
};

export default Jobs;



