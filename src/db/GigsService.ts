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
}

export default GigsService;
