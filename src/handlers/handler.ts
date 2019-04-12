import { IDatastore } from '../db/Datastore';

class Handler {
  ds: IDatastore | any;

  constructor(ds: IDatastore | any) {
    this.ds = ds;
  }
}

export default Handler;
