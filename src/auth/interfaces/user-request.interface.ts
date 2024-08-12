import { Request } from 'express';

interface UserPayload {
  id: string;
}

export interface UserRequest extends Request {
  user: UserPayload;
}
