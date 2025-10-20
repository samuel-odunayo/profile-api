require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const config = {
  userEmail: process.env.USER_EMAIL,
  userName: process.env.USER_NAME,
  userStack: process.env.USER_STACK,
  catApiUrl: process.env.CAT_API_URL || 'https://catfact.ninja/fact',
  catApiTimeout: parseInt(process.env.CAT_API_TIMEOUT) || 5000
};

app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/**
 * Fetch a random cat fact from the Cat Facts API
 * @returns {Promise<string>}
 */
async function fetchCatFact() {
  try {
    const response = await axios.get(config.catApiUrl, {
      timeout: config.catApiTimeout,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.data && response.data.fact) {
      return response.data.fact;
    }
    
    throw new Error('Invalid response format from Cat Facts API');
  } catch (error) {
    console.error('Error fetching cat fact:', error.message);
    
   
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request to Cat Facts API timed out');
    } else if (error.response) {
      throw new Error(`Cat Facts API returned status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from Cat Facts API');
    } else {
      throw error;
    }
  }
}


app.get('/me', async (req, res) => {
  try {
    
    const catFact = await fetchCatFact();
    
    
    const timestamp = new Date().toISOString();
    
    
    const response = {
      status: 'success',
      user: {
        email: config.userEmail,
        name: config.userName,
        stack: config.userStack
      },
      timestamp: timestamp,
      fact: catFact
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
    
    console.log(`✓ Successfully served /me endpoint with cat fact`);
  } catch (error) {
    console.error('Error in /me endpoint:', error.message);
    
    
    res.setHeader('Content-Type', 'application/json');
    res.status(503).json({
      status: 'error',
      message: 'Failed to fetch cat fact',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});


app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.path
  });
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});


app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`Profile endpoint: http://localhost:${PORT}/me`);
  console.log(`Health check: http://localhost:${PORT}/health\n`);
});


process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});