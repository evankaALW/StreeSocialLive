// middleware/authenticateAPIKEY.js
const validApiKeys = new Set([
    '7dn93jKEYgdrsnskALWdyeg2mkhddts',
    'iw8tbshd638nsgw429kdhxtaWLA8ajdycnYEKe02y',
    // Add more API keys as needed
  ]);
  
  const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['key-alw-api-key'];
  
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }
  
    if (!validApiKeys.has(apiKey)) {
      return res.status(403).json({ error: 'Invalid API key' });
    }
  
    next();
  };
  
  module.exports = authenticateApiKey;
  