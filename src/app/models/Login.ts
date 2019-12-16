import {User} from './User';

export class Login {
  email: string;
  password: string;
  token!: string;
  user?: User;
}
