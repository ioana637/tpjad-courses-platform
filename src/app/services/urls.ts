export const baseUrl = 'http://localhost:8080/courses-management';

export const userManagementUrl = `${baseUrl}/users-management`;
export const userLogin = `${userManagementUrl}/login`;
export const userLogout = `${userManagementUrl}/logout`;
export const userRegister = `${userManagementUrl}/register`;
export const userSaveAccountSettings = `${userManagementUrl}/save-account-settings`;

export const coursesManagementUrl = `${baseUrl}/courses`;
export const coursesGetAll = `${coursesManagementUrl}`;
export const coursesAddEdit = `${coursesManagementUrl}`;
export const coursesSendNewsToStudents = `${coursesManagementUrl}/email`;
export const coursesFilter= `${coursesManagementUrl}/filter`;
export const coursesMy= `${coursesManagementUrl}/my-courses`;
export function coursesDeleteAndGetById(id: string) { return `${coursesManagementUrl}/${id}`;}
export function coursesEnroll(id: string) {return `${coursesManagementUrl}/${id}/enroll`;}
export function coursesStudentsForCourse(id: string) {return `${coursesManagementUrl}/${id}/students`;}
export function coursesNumberStudents(id: string) {return `${coursesManagementUrl}/${id}/students-number`;}

export const lecturesManagementUrl = `${baseUrl}/`;





