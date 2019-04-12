import * as pg from 'pg';

import Datastore from './Datastore';
import Gig from '../types/Gig';

class GigsService extends Datastore {
  constructor(cl: pg.Client) {
    super(cl);
  }

  public insert = async function(gig: Gig): Promise<Gig> {
    try {
      const sql: string =
        'INSERT INTO gigs (place, "eventDate", "fbLink", description) VALUES ($1, $2, $3, $4) RETURNING *';

      const params = [gig.place, gig.eventDate, gig.fbLink, gig.description];

      const result = await this.client.query(sql, params);

      const [row] = result.rows;

      const g = <Gig>row;

      return g;
    } catch (err) {
      throw err;
    }
  };

  public findByid = async function(id: string): Promise<Gig | null> {
    try {
      const query = 'SELECT * FROM gigs WHERE id=$1';
      const result = await this.client.query(query, [id]);

      if (!result.rows.length) {
        return null;
      }

      const [row] = result.rows;
      const gig: Gig = <Gig>row;

      return gig;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  public findAll = async function(id: string): Promise<Gig[]> {
    try {
      const query = 'SELECT * FROM gigs';
      const result = await this.client.query(query);

      console.log('-----------------');
      console.log(result.rows);
      const gigs = result.rows.map((row: any) => {
        const gig: Gig = <Gig>row;

        return gig;
      });

      return gigs;
    } catch (err) {
      throw err;
    }
  };
}

export default GigsService;
