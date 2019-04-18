import http from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl + '/expense-categories';

async function find(params) {
  try {
    let url = `${apiEndpoint}`;
    if (params) url += `?${params}`;
    return await http.get(url, {
      headers: { 'x-request-count-total': 'true' }
    });
  } catch (ex) {
    console.log('ExpenseCategoryService:find', ex);
    throw new Error(ex.message);
  }
}

async function findById(id, params) {
  try {
    let url = `${apiEndpoint}/${id}`;
    if (params) url += `?${params}`;
    return await http.get(url);
  } catch (ex) {
    console.log('ExpenseCategoryService:findById', ex);
    throw new Error(ex.message);
  }
}

async function create(item) {
  try {
    return await http.post(`${apiEndpoint}`, item);
  } catch (ex) {
    console.log('ExpenseCategoryService:create', ex);
    throw new Error(ex.message);
  }
}

async function update(id, item) {
  try {
    return await http.put(`${apiEndpoint}/${id}`, item);
  } catch (ex) {
    console.log('ExpenseCategoryService:update', ex);
    throw new Error(ex.message);
  }
}

async function remove(id) {
  try {
    return await http.delete(`${apiEndpoint}/${id}`);
  } catch (ex) {
    console.log('ExpenseCategoryService:remove', ex);
    throw new Error(ex.message);
  }
}

export { find, findById, create, update, remove };
