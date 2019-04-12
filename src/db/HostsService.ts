import * as pg from 'pg';

import Datastore from './Datastore';
import Host from '../types/Host';

class HostsService extends Datastore {
  constructor(cl: pg.Client) {
    super(cl);
  }

  public insert = async function(host: Host): Promise<Host> {
    try {
      const sql: string = 'INSERT INTO hosts (name) VALUES ($1) RETURNING *';

      const params = [host.name];

      const result = await this.client.query(sql, params);

      const [row] = result.rows;

      const h = <Host>row;

      return h;
    } catch (err) {
      console.log('----------------1');
      console.log(err);
      throw err;
    }
  };
}

export default HostsService;
