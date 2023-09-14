import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
const LoginBaseUrl = "http://localhost:3003/api/login";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const login = async (credentials) => {
  try {
    const response = await axios.post(LoginBaseUrl, credentials);
    const user = response.data;
    // Supongamos que el token está en la respuesta como user.token
    const token = user.token;
    setToken(token); // Establece el token en el servicio de blogs
    return user;
  } catch (error) {
    throw new Error("Wrong credentials");
  }
};
export default { getAll, login, setToken, create, update };
