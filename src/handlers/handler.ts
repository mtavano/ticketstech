import { IDatastore } from '../db/Datastore';

class Handler {
  ds: IDatastore;

  constructor(ds: IDatastore) {
    this.ds = ds;
  }
}

export default Handler;
