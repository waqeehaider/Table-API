import axios from "axios";

const API_URL = "http://localhost:5000/users";

//  GET all users
export const getUsers = () => {
  return axios.get(API_URL);
};

//  ADD user
export const addUser = (newUser) => {
  return axios.post(API_URL, newUser);
};

//  UPDATE user
export const updateUser = (id, updatedData) => {
  return axios.put(`${API_URL}/${id}`, updatedData);
};

//  DELETE user
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
