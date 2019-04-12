import { Request, Response } from 'express';

const handleFunc = async (func: (req: Request) => Promise<any>, req: Request) => {
  try {
    return await func(req);
  } catch (error) {
    console.log('----------------3');
    console.log(error);
    return Promise.resolve({ data: { error }, status: 500 });
  }
};

export default (func: (req: Request) => Promise<any>) => async (req: Request, res: Response) => {
  const { data, status } = await handleFunc(func, req);

  return res.status(status).send(data);
};
