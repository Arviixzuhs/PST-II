import { api } from './axios'

/* Rutas para manejar a los pacientes */
export const reqAddPatient = (data: any) => api.post('/patient/register', data)
export const reqEditPatient = ({ data, id }: { data: any; id: any }) =>
  api.put('/patient/update/' + id, data)
export const reqDeletePatient = (id: any) => api.delete('/patient/delete/' + id)
export const reqLoadAllPatients = () => api.get('/patient/get-all')

/* Rutas para manejar el auth */
export const authLogin = async (data: any) => api.post('/auth/login', data)
export const authRegister = async (data: any) => api.post('/auth/register', data)
export const authLoadProfileByToken = async (data: any) => api.get('/auth/load/profile/' + data)

/* Rutas para manejar las consultas */
export const reqCreateConsult = async (data: any) => api.post('/consult/create', data)
export const reqDeleteConsult = async (id: any) => api.delete('/consult/delete/' + id)
export const reqUpdateConsult = async ({ data, id }: { data: any; id: any }) =>
  api.put('/consult/update/' + id, data)
export const reqGetAllConsults = async () => api.get('/consult/get-all')
export const reqGetConsult = async (id: any) => api.get('/consult/get/' + id)

/* Rutas para manejar al personal medico */
export const reqAddStaff = (data: any) => api.post('/clinical-staff/create', data)
export const reqEditStaff = ({ data, id }: { data: any; id: any }) =>
  api.put('/clinical-staff/update/' + id, data)
export const reqDeleteStaff = (id: any) => api.delete('/clinical-staff/delete/' + id)
export const reqLoadAllStaff = () => api.get('/clinical-staff/get-all')

export const reqGetHospitalStats = () => api.get('/hospital/get-stats')
