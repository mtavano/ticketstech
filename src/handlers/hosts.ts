import { Request } from 'express';

import Handler from './handler';
import Host from '../types/Host';
import { IDatastore } from '../db/Datastore';

class HostsHandler extends Handler {
  constructor(ds: IDatastore) {
    super(ds);
  }

  public addHosts = async (req: Request): Promise<any> => {
    try {
      const { body } = req;
      let host = <Host>body;
      host = await this.ds.insert(host);

      return { data: host, status: 201 };
    } catch (err) {
      console.log('----------------2');
      console.log(err);
      throw err;
    }
  };
}

export default HostsHandler;
