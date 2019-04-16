import { Request } from 'express';

import Handler from './handler';
import Assistance from '../types/Assistance';
import { IDatastore } from '../db/Datastore';

class AssistancesHandler extends Handler {
  constructor(ds: IDatastore) {
    super(ds);
  }

  public addAssistances = async (req: Request): Promise<any> => {
    try {
      const { body } = req;
      let ass = <Assistance>body;
      ass = await this.ds.insert(ass);

      return { data: ass, status: 201 };
    } catch (err) {
      console.log('----------------2');
      console.log(err);
      throw err;
    }
  };

  public findByGigId = async (req: Request): Promise<any> => {
    try {
      const { id } = req.params;

      const assistances: Assistance[] = await this.ds.findByGigId(id);

      return { data: { assistances }, status: 200 };
    } catch (err) {
      throw err;
    }
  };
}

export default AssistancesHandler;
