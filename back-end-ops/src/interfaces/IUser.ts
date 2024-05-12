export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  status: boolean;
  dateCreated: number;
  dateDesactivated?: number;
  balance: number;
}
