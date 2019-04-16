import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

import GigsService from './db/GigsService';
import HostsService from './db/HostsService';
import RaversService from './db/RaverService';
import AssistancesService from './db/AssistancesService';

import handleFunc from './handlers';

import GigsHandler from './handlers/gigs';
import HostsHandler from './handlers/hosts';
import RaversHandler from './handlers/ravers';
import AssistancesHandler from './handlers/assistances';

import ping from './handlers/ping';

(async () => {
  try {
    // Database connection
    const client = new Client();
    await client.connect();

    // Server instantiation
    const server = express();

    // Services creations
    const gigsSvc = new GigsService(client);
    const hostsSvc = new HostsService(client);
    const raversScv = new RaversService(client);
    const assSvc = new AssistancesService(client);

    // Handlers creation
    const gigsHandler = new GigsHandler(gigsSvc);
    const hostsHandler = new HostsHandler(hostsSvc);
    const raversHandler = new RaversHandler(raversScv);
    const assHandler = new AssistancesHandler(assSvc);

    // Middlewares
    server.use(bodyParser.json());

    // Endpoints
    server.get('/api/ping', ping);
    // Gigs
    server.post('/api/gigs', handleFunc(gigsHandler.addGigs));
    server.get('/api/gigs/:id', handleFunc(gigsHandler.findByid));
    server.get('/api/gigs', handleFunc(gigsHandler.findAll));
    // Ravers
    server.post('/api/ravers', handleFunc(raversHandler.addRavers));
    server.get('/api/ravers/:dni', handleFunc(raversHandler.findByDni));
    server.get('/api/ravers', handleFunc(raversHandler.findAll));
    // Hosts
    server.post('/api/hosts', handleFunc(hostsHandler.addHosts));
    // Assistances
    server.post('/api/assistances', handleFunc(assHandler.addAssistances));

    const { PORT } = process.env;
    server.listen(PORT);
  } catch (error) {
    console.log(error);
  }
})();
