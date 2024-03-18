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
