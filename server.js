// Load environment variables
require('./envloader')();

// Import required modules
const compression = require('compression');
const helmet = require('helmet');
const baseRouter = require('./router.js');
const morgan = require('morgan');
const { respond, l } = require('./loader.js').helpers;
const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Define a test API endpoint
app.get('/api/endpoint', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Middleware to parse JSON and handle syntax errors
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return respond(res, 400, { message: 'Invalid JSON found' });
    }
    next();
});

// Log all API requests
app.use(
    morgan(
        'REQUEST [:date[clf]] ":method :url HTTP/:http-version" :status :user-agent',
        {
            immediate: true,
            skip: function (req) { return req.path === '/api/'; },
        },
    ),
);

// Middleware to parse URL-encoded data
app.use(
    express.urlencoded({
        extended: true,
        limit: '2mb',
        parameterLimit: 1000000,
    }),
);

// Use compression and security middlewares
app.use(compression());
app.use(helmet());

// Mount the base router
app.use('/api/', baseRouter);

// Define a root route
app.get('/', (req, res) => {
    return res.send('Compiler is up and working');
});

// Start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        l.info(`Server started at port: ${PORT}`);
    });
}

// Export the app for testing
module.exports = app;
