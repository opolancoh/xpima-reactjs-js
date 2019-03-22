import http from 'axios';

const apiUrl = 'http://localhost:5000/api';
const apiEndpoint = apiUrl + '/expense-categories';

async function find(params) {
  let url = `${apiEndpoint}`;
  if (params) url += `?${params}`;
  return await http.get(url);
}

async function findById(id, params) {
  let url = `${apiEndpoint}/${id}`;
  if (params) url += `?${params}`;
  return await http.get(url);
}

async function create(item) {
  return await http.post(`${apiEndpoint}`, item);
}

async function update(id, item) {
  return await http.put(`${apiEndpoint}/${id}`, item);
}

async function remove(id) {
  return await http.delete(`${apiEndpoint}/${id}`);
}

export { find, findById, create, update, remove };
