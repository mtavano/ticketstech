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

  public findByDni = async (req: Request): Promise<any> => {
    try {
      const { dni } = req.params;
      const raver = await this.ds.findByDni(dni);

      return { data: { raver }, status: 200 };
    } catch (err) {
      throw err;
    }
  };

  public findAll = async (req: Request): Promise<any> => {
    try {
      const ravers = await this.ds.findAll();

      return { data: { ravers }, status: 200 };
    } catch (err) {
      throw err;
    }
  };
}

export default RaversHandler;
