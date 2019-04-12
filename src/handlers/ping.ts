import { Request, Response } from 'express';

const ping = (_: Request, res: Response): any => {
  return res.json({ foo: 'bar' }).status(200);
};

export default ping;
