const env = require('dotenv');
const config = {}

// Environment Variables
env.config();

config.PORT = process.env.PORT;
config.DATABASE_URL = process.env.DATABASE_URL;
config.SECRET_KEY = process.env.SECRET_KEY;
config.MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
config.MAILGUN_SANDBOX = process.env.MAILGUN_SANDBOX;

module.exports = config;
