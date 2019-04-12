import { Request, Response } from 'express';
import { IDatastore } from '../db/Datastore';
import Gig from '../types/Gig';

export const addGigs = (ds: IDatastore) => async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const g: Gig = <Gig>body;
    const data = await ds.insert(g);

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'internal server error' });
  }
};
