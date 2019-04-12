import { Request } from 'express';

import Handler from './handler';
import { IDatastore } from '../db/Datastore';
import Gig from '../types/Gig';

class GigsHandler extends Handler {
  constructor(ds: IDatastore) {
    super(ds);
  }

  public addGigs = async (req: Request): Promise<any> => {
    try {
      const { body } = req;
      let gig: Gig = <Gig>body;
      gig = await this.ds.insert(gig);

      return { data: gig, status: 201 };
    } catch (err) {
      throw err;
    }
  };
}

export default GigsHandler;
