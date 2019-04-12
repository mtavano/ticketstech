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

  public findByid = async (req: Request): Promise<any> => {
    try {
      const { id } = req.params;
      const gig: Gig = await this.ds.findByid(id);

      return { data: { gig }, status: 200 };
    } catch (err) {
      throw err;
    }
  };

  public findAll = async (req: Request): Promise<any> => {
    try {
      const gigs = await this.ds.findAll();

      return { data: { gigs }, status: 200 };
    } catch (err) {
      throw err;
    }
  };
}

export default GigsHandler;
