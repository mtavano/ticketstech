import * as pg from 'pg';

import Datastore from './Datastore';
import Raver from '../types/Raver';

class RaversService extends Datastore {
  constructor(cl: pg.Client) {
    super(cl);
  }

  public insert = async function(raver: Raver): Promise<Raver> {
    try {
      const sql: string =
        'INSERT INTO ravers ("fullName", dni, email) VALUES ($1, $2, $3) RETURNING *';

      const params = [raver.fullName, raver.dni, raver.email];

      const result = await this.client.query(sql, params);

      const [row] = result.rows;

      const r = <Raver>row;

      return r;
    } catch (err) {
      console.log('----------------1');
      console.log(err);
      throw err;
    }
  };
}

export default RaversService;
