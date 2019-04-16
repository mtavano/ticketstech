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

  public findByDni = async function(dni: string): Promise<Raver | null> {
    try {
      const sql: string = 'SELECT * FROM ravers WHERE dni=$1';
      const result = await this.client.query(sql, [dni]);

      if (!result.rows.length) {
        return null;
      }

      const [row] = result.rows;
      const raver: Raver = <Raver>row;

      return raver;
    } catch (err) {
      throw err;
    }
  };

  public findAll = async function(): Promise<Raver[]> {
    try {
      const sql: string = 'SELECT * FROM ravers';
      const result = await this.client.query(sql);

      const ravers: Raver[] = result.rows.map((row: any) => {
        const raver: Raver = <Raver>row;

        return raver;
      });

      return ravers;
    } catch (err) {
      throw err;
    }
  };
}

export default RaversService;
