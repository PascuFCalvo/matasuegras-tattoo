import axios from "axios";

export const logUser = async (body) => {
  return await axios.post(`http://localhost:4000/user/login`, body);
};

export const registerUser = async (body) => {
  return await axios.post(`http://localhost:4000/user/register`, body);
};

export const createAppointment = async (body, token) => {
  return await axios.post(`http://localhost:4000/appointments/create`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getTattoos = async () => {
  return await axios.get(`http://localhost:4000/public/getImages`);
};

export const getTattooArtist = async () => {
  return await axios.get(`http://localhost:4000/public/tattooArtists`);
};

export const getAllUsers = async (token) => {
  return await axios.get(`http://localhost:4000/blackAlien/getUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAppointments = async (token) => {
  return await axios.get(`http://localhost:4000/blackAlien/getAppointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAppointmentsAsATattooArtist = async (body) => {
  
  return await axios.get(
    `http://localhost:4000/tattoo_artist/myAppointments`,
    body
  );
};

export const deleteAUser = async (id, token) => {
  console.log(token)
  return await axios.delete(`http://localhost:4000/blackAlien/deleteuser`, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id: id } 
  }
  
);
};

export const deleteAnAppointment = async (id, token) => {
  console.log(token)
  return await axios.delete(
    `http://localhost:4000/appointments/delete`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id: id } 
    }
    
  );
  };

export const updateAnAppointment = async (body, token) => {
  return await axios.put(`http://localhost:4000/appointments/update`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const myDetailAppointments = async (body, token) => {
  return await axios.get(`http://localhost:4000/user/myAppointments`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (body, token) => {
  console.log(token);
  return await axios.put(`http://localhost:4000/user/update`,  body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTattoo = async (body, token) => {
  console.log(token);
  return await axios.put(`http://localhost:4000/tattoo_artist/update`,  body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
