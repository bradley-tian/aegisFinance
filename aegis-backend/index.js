

import supabaseJS from '@supabase/supabase-js';
import express from 'express';
import cors from 'cors';
import http from 'http';

const app = express();
app.use(cors());

const supabaseUrl = "https://gtnverzsssxngnudarom.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bnZlcnpzc3N4bmdudWRhcm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3NDE5MzIsImV4cCI6MTk5MjMxNzkzMn0.5IQfTU1GYZTtjlI4jj-kxpfb8lMDMiTolhi7EbIELCw"

const supabase = supabaseJS.createClient(supabaseUrl, supabaseAnonKey)

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.get('/get_transactions', (req, res) => {
  let transactions = {};
  let fetch_data = async (res) => {
    try {
      let { data, error } = await supabase.from('transactions').select('*');
      transactions = data;
      console.log(data)
      if (transactions === {}) {
        console.log("No data retrieved.")
      }
      res.send(transactions);
    } catch(error) {
      console.log('fetch failed.')
      console.log(error.message);
    };
  }
  fetch_data(res);
  console.log("fetch complete.")
})

app.post('/add_transaction', (req, res) => {
  const data = req.body;
  const insert_data = async () => {
    const transaction = {
      created_at: new Date(),
      Destination: body.destination,
      Amount: body.amount,
    };
    let { error } = await supabase.from("transactions").insert(transaction);
    if (error) {
      throw error;
    }
  }

  insert_data();
  res.send("SUCCESS")
})

app.listen(3003, () => console.log('Aegis Finance API is listening on port 3003.'));