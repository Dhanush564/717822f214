const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 9876; 

app.use(cors());

app.get('/numbers/:id', async (req, res) => {
  const { id } = req.params;

  let url;
  switch (id) {
    case 'prime':
      url = 'http://localhost:9877/primes'; 
      break;
    case 'fibo':
      url = 'http://localhost:9877/fibo'; 
      break;
    case 'even':
      url = 'http://localhost:9877/even'; 
      break;
    case 'rand':
      url = 'http://localhost:9877/rand'; 
      break;
    default:
      return res.status(400).json({ error: 'Invalid number type' });
  }

  try {
    const response = await axios.get(url, { timeout: 500 });

    res.json({
      numbers: response.data.numbers,
    });
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    res.status(500).json({ error: 'Error fetching numbers' });
  }
});

app.listen(port, () => {
  console.log(`Main Server running on http://localhost:${port}`);
});