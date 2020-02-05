require('dotenv').config();

const env = process.env.STAGE || 'development';
const configs = {
  development: {
    api: 'http://localhost:3000',
    bucket: 'booking.silvermirror.com'
  },
  staging: {
    api: 'https://kmhxppu8ui.execute-api.us-east-1.amazonaws.com/staging',
    bucket: 'booking.staging.silvermirror.com'
  },
  production: {
    api: 'https://api.silvermirror.com', // 'https://40on764nf3.execute-api.us-east-1.amazonaws.com/production',
    bucket: 'booking.silvermirror.com'
  }
}
const config = configs[env]

module.exports = { config, env }