import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

import GigsService from './db/GigsService';
import HostsService from './db/HostsService';

import handleFunc from './handlers';

import GigsHandler from './handlers/gigs';
import HostsHandler from './handlers/hosts';
import ping from './handlers/ping';

(async () => {
  try {
    const client = new Client();
    await client.connect();

    // server
    const server = express();
    // services
    const gigsSvc = new GigsService(client);
    const hostsSvc = new HostsService(client);

    // handlers
    const gigsHandler = new GigsHandler(gigsSvc);
    const hostsHandler = new HostsHandler(hostsSvc);

    // Middlewares
    server.use(bodyParser.json());

    // Endpoints
    server.get('/api/ping', ping);
    server.post('/api/gigs', handleFunc(gigsHandler.addGigs));
    server.post('/api/hosts', handleFunc(hostsHandler.addHosts));

    const { PORT } = process.env;
    server.listen(PORT);
  } catch (error) {
    console.log(error);
  }
})();
