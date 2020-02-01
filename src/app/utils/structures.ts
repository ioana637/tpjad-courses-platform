export enum Role {
  PROFESSOR,
  STUDENT,
  NOT_SUPPORTED
};

export interface User {
  email: string;
  password: string;
  newPassword?: string;
  rewritePassword?: string;
  id?: string;
  name?: string;
  surname?: string;
  role?: string;
  picture?: File | string;
}

