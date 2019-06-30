import { post } from '../utils/request'

export function getRegest (pamars) {
  return post('/api/v1/auth/reg', pamars)
}
export function getLogin (pamars) {
  return post('/api/v1/auth/login', pamars)
}
