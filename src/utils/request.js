import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.cat-shop.penkuoer.com',
  timeout: 5000,
});
export function post (url, data, config) {
  return instance.post(url, data, config);
}
export function get (url, config) {
  return instance.get(url, config);
}

export function del (url, config) {
  return instance.delete(url, config);
}
