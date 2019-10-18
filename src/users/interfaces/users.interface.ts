import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly username: string;
  readonly password: string;
}
