import { Request } from 'express';

import Handler from './handler';
import Raver from '../types/Raver';
import { IDatastore } from '../db/Datastore';

class RaversHandler extends Handler {
  constructor(ds: IDatastore) {
    super(ds);
  }

  public addRavers = async (req: Request): Promise<any> => {
    try {
      const { body } = req;
      let host = <Raver>body;
      host = await this.ds.insert(host);

      return { data: host, status: 201 };
    } catch (err) {
      console.log('----------------2');
      console.log(err);
      throw err;
    }
  };
}

export default RaversHandler;
