export enum Role {
  PROFESSOR,
  STUDENT,
  NOT_SUPPORTED
};

export interface User {
  email: string;
  password?: string;
  newPassword?: string;
  rewritePassword?: string;
  id?: string;
  name?: string;
  surname?: string;
  role?: string;
  picture?: File | string;
}

export interface Course {
  description?: string;
  id?: number;
  lectures?: Lecture[];
  maxStudents?: number;
  studentsSignedIn?: number;
  title?: string;
  year?: string;
  users?: User[];
  professor? :User;
}

export interface Lecture {
  courseId?: number;
  attachment?: File | string;
  date?: Date;
  filename?: string;
  id?: number;
  title?: string; 
}

