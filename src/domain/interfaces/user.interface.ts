export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  updatedAt: Date;
}

export type JwtPayload = {
  id: number;
  username: string;
};
