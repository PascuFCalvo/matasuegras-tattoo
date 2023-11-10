import axios from "axios";

export const logUser = async (body) => {
  return await axios.post(`http://localhost:4000/user/login`, body);
};

export const registerUser = async (body) => {
  return await axios.post(`http://localhost:4000/user/register`, body);
};

export const createAppointment = async (body) => {
   return await axios.post(`http://localhost:4000/appointments/create`, body)
}
export const getTattoos = async () => {
  return await axios.get(`http://localhost:4000/public/getImages`);
};

export const getTattooArtist = async () => {
  return await axios.get(`http://localhost:4000/public/tattooArtists`);
};


