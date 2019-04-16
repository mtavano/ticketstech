import * as pg from 'pg';

import Datastore from './Datastore';
import Assistance from '../types/Assistance';

class AssistancesService extends Datastore {
  constructor(cl: pg.Client) {
    super(cl);
  }

  public insert = async function(ass: Assistance): Promise<Assistance> {
    try {
      const sql: string =
        'INSERT INTO assistances ("raverId", "gigId", "hostId") VALUES ($1, $2, $3) RETURNING *';

      const params = [ass.raverId, ass.gigId, ass.hostId];

      const result = await this.client.query(sql, params);

      const [row] = result.rows;

      const a = <Assistance>row;

      return a;
    } catch (err) {
      console.log('----------------1');
      console.log(err);
      throw err;
    }
  };

  public findByGigId = async function(id: string): Promise<Assistance[]> {
    try {
      const sql: string = `SELECT * FROM assistances WHERE "gigId"=$1`;
      const result = await this.client.query(sql, [id]);

      if (!result.rows.length) {
        return [];
      }

      const assistances: Assistance[] = result.rows.map((row: any) => {
        const ass: Assistance = <Assistance>row;

        return ass;
      });

      return assistances;
    } catch (err) {
      throw err;
    }
  };
}

export default AssistancesService;
