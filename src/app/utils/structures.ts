export enum Role {
  PROFESSOR,
  STUDENT,
  NOT_SUPPORTED
};

export interface User {
  email: string;
  password: string;
  id?: string;
  name?: string;
  surname?: string;
  role?: Role;
}

