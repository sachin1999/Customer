import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
// Configuration 
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URL).then(()=> {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} connected successfully`));

}).catch((error)=> console.log(`${error} did not connect`));
app.post('/get-token', async (req, res) => {
    try {
      const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: req.body.login_id,
          password: req.body.password,
        }),
      });
  
      const data = await response.json();
      
      res.json(data); // Forward the API response to the React application
    } catch (error) {
      console.error('Error during API request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/create-customer', async (req, res) => {
    console.log(req.body);
    console.log(req.headers.authorization)
    try {
      const apiUrl = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create`;
      const response = await axios.post(apiUrl, req.body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization,
        },
      });
      if (response.status === 201) {
        res.status(201).json({ message: 'Successfully Created' });
      } else {
        res.status(response.status).json(response.data);
      }
    } catch (error) {
      console.error('Error during create user API request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.get('/getCustomerList', async (req, res) => {
    try {
      const response = await axios.get(
        'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp',
        {
          params: {
            cmd: 'get_customer_list',
          },
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Failed to get customer list', error.message);
      res.status(500).json({ error: 'Failed to get customer list' });
    }
  });
  app.post('/deleteCustomer', async (req, res) => {
    try {
      const response = await axios.post(
        `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${req.body.uuid}`,
        req.body,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Failed to delete customer', error.message);
      res.status(500).json({ error: 'Failed to delete customer' });
    }
  });
  
  // Proxy route for updating a customer
  app.post('/updateCustomer', async (req, res) => {
    try {
      const response = await axios.post(
        `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${req.body.uuid}`,
        req.body,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Failed to update customer', error.message);
      res.status(500).json({ error: 'Failed to update customer' });
    }
  });
