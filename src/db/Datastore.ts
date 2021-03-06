import * as pg from 'pg';

class Datastore {
  client: pg.Client;

  constructor(cl: pg.Client) {
    this.client = cl;
  }
}

export type IDatastore = {
  insert(...args: any): Promise<any>;
};

export default Datastore;
