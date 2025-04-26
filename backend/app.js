const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 4000;

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE row_status ='ACTIVE'`);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/jobs', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM jobs WHERE row_status='ACTIVE'`);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/applicants', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        applicants.*, 
        jobs.title AS job_title,
        users.username AS applicant_username
      FROM 
        applicants
      LEFT JOIN 
        jobs ON applicants.job_id = jobs.id
      LEFT JOIN 
        users ON applicants.user_id = users.id
      WHERE 
        applicants.row_status = 'ACTIVE'
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params; 
  const { username, email, password, user_type } = req.body; 

  try {
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3, user_type = $4 WHERE id = $5 RETURNING *',
      [username, email, password, user_type, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('User not found'); 
    }

    res.json(result.rows[0]); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error'); 
  }
});

app.put('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, start_location, end_location, job_date, price, user_id } = req.body; 

  try {
    const result = await pool.query(
      'UPDATE jobs SET title = $1, description = $2, start_location = $3, end_location = $4, job_date = $5, price = $6, user_id = $7 WHERE id = $8 RETURNING *',
      [title, description, start_location, end_location, job_date, price, user_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Job not found'); 
    }

    res.json(result.rows[0]); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.put('/applicants/:id', async (req, res) => {
  const { id } = req.params; 
  const { applicant_status, job_id, user_id, applied_date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE applicants SET applicant_status = $1, job_id = $2, user_id = $3, applied_date = $4 WHERE id = $5 RETURNING *',
      [applicant_status, job_id, user_id, applied_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Applicant not found'); 
    }

    res.json(result.rows[0]); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error'); 
  }
});

app.post('/users', async (req, res) => { 
  const { created_by, username, email, password, user_type } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (created_by, username, email, password, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [created_by, username, email, password, user_type]
    );

    res.json(result.rows[0]); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/jobs', async (req, res) => {
  const { created_by, title, description, start_location, end_location, job_date, price, user_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO jobs (created_by, title, description, start_location, end_location, job_date, price, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [created_by, title, description, start_location, end_location, job_date, price, user_id]
    );

    res.json(result.rows[0]); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/applicants', async (req, res) => {
  const { created_by, applicant_status, job_id, user_id, applied_date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO applicants (created_by, applicant_status, job_id, user_id, applied_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [created_by, applicant_status, job_id, user_id, applied_date]
    );

    res.json(result.rows[0]); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


  

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
