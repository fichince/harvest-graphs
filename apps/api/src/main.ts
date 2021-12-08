import * as express from 'express';
import * as dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const HARVEST_TOKEN = process.env.HARVEST_TOKEN;
const HARVEST_ACCOUNT_ID = process.env.HARVEST_ACCOUNT_ID;
const USER_AGENT = 'HarvestGraphs (acchoi@gmail.com)';

const app = express();

const apiProxy = createProxyMiddleware({
  target: 'https://api.harvestapp.com',
  changeOrigin: true,
  secure: false,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('user-agent', USER_AGENT);
    proxyReq.setHeader('authorization', `Bearer ${HARVEST_TOKEN}`);
    proxyReq.setHeader('harvest-account-id', HARVEST_ACCOUNT_ID);

  },
  logLevel: 'debug'
});
app.use('/v2', apiProxy);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
