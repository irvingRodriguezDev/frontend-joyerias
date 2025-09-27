import clienteAxios from "./Axios";

export default async function MethodGet(url) {
  return await clienteAxios.get(url);
}

export async function MethodPost(url, data) {
  return await clienteAxios.post(url, data);
}

export async function MethodPut(url, data) {
  return await clienteAxios.put(url, data);
}

export async function MethodDelete(url) {
  return await clienteAxios.delete(url);
}
