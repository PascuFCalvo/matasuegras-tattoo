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

export const getAllUsers = async () => {
  return await axios.get(`http://localhost:4000/blackAlien/getUsers`)
}

export const getAppointments= async () => {
  return await axios.get(`http://localhost:4000/blackAlien/getAppointments`)
}

export const getAppointmentsAsATattooArtist= async (body) => {
  return await axios.get(`https://localhost:4000/tattoo_artist/myAppointments`, body)
}

export const deleteAUser= async (body) => {
  return await axios.delete(`https://localhost:4000/blackAlien/deleteuser`, body)
}

export const deleteAnAppointment= async (body) => {
  return await axios.delete(`http://localhost:4000/appointments/delete`, body)
}




