import  { useEffect, useState } from "react";
import "./TattooArtistAppointments.css";
import { getAllUsers, getAppointments, getTattooArtist } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AppointmentDetail } from "../../common/AppointmentDetail/AppointmentDetail";

export const TattoArtistAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [tattooArtist, setTattooArtist] = useState([]);
  const [selectedAppointment, setSelectedAppointemt] = useState ({});
  const [isModalVisible, setIsModalVisible] = useState (false);

  const isLoggedIn = localStorage.getItem('token');

  let decoded = {};
  
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    localStorage.setItem("level", decoded.level);
    localStorage.setItem("nombre", decoded.user_name);
  }

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers()
        .then((response) => {
          setUsers(response.data.Users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [users]);
  
  useEffect(() => {
    if (tattooArtist.length === 0) {
      getTattooArtist()
        .then((response) => {
          setTattooArtist(response.data.Artists);
        })
        .catch((error) => {
          console.error("Error fetching tattoo artist:", error);
        });
    }
  }, [tattooArtist]);
  
  useEffect(() => {
    if (appointments.length === 0) {
      getAppointments()
        .then((response) => {
          setAppointments(response.data.Appointments);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [appointments]);
  
  let encontrado = false;
  let idEncontrada = 0;
  tattooArtist.forEach(tattooArtist => {
    if (tattooArtist.user_name === decoded.user_name) {
      encontrado = true;
      idEncontrada = tattooArtist.id;
    }
  });

  

  let filteredAppointments = [];

  if (encontrado) {
    filteredAppointments = appointments.filter(
      (appointment) => appointment.tattoo_artist === idEncontrada
    );
  }

  const handleAppointmentClick = (appointment) => {
    
    const appointmentDetails = {
      id: appointment.id,
      title: appointment.title,
      description: appointment.description,
      tattoo_artist: decoded.user_name,
      client: getClientName(appointment.client),
      date: appointment.appointment_date, 
      turn: appointment.appointment_turn, 
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };

    setIsModalVisible(true);
    setSelectedAppointemt(appointmentDetails);
    
  };

  const handleDetailVisibilityChange = (state) =>{ 
    setIsModalVisible(state)
    
  }

  const getClientName = (clientId) => {
    const client = users.find((user) => user.id === clientId);
    return client ? client.user_name : "";
  };

  return (
    <>
      <AppointmentDetail
       selected = {selectedAppointment}
       visibility={isModalVisible}
       setVisibility = {handleDetailVisibilityChange}
       />

      <div className="ListUsers">
        <div className="panelAdminTitle">LISTADO DE CITAS</div>
        {filteredAppointments.length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {filteredAppointments.map((appointment) => (
                <div
                  className="userRow"
                  onClick={() => handleAppointmentClick(appointment)}
                  key={appointment.id}
                >
                  <div className="id">{appointment.id}</div>
                  <div className="userName">{appointment.title}</div>
                  <div className="email">{appointment.description}</div>
                  <div className="phone">
                    {getClientName(appointment.client)}
                  </div>
                  <div className="buttonEdit"> Edit</div>
                  <div className="buttonDelete"> X</div>
                </div>
              ))}
            </div>
            <div
              className="buttonBack"
              onClick={() => navigate("/myTattooPanel")}
            >
              Volver al panel
            </div>
          </>
        ) : (
          <div>No hay citas para este tatuador</div>
        )}
      </div>
    </>
  );
};
