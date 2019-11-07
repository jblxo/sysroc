import { Request, Response } from 'express';

export interface MyContext {
  readonly req: Request;
  readonly res: Response;
}
