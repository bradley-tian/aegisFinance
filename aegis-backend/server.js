import { createClient } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

const express = require('express');
const app = express();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.get('/get_transactions', (req, res) => {
  const transactions = {};
  const fetch_data = async () => {
    try {
      let { data } = await supabase.from("transactions")
      transactions = data;
    } catch(error) {
      alert(error.message);
    };
  }
  fetch_data();
  res.send(transactions);
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

app.listen(3003, () => console.log('Example app is listening on port 3003.'));