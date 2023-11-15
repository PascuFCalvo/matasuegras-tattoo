import { useEffect, useState } from "react";
import "./MainUserPanelAppointments.css";
import { getAllUsers, getAppointments, getTattooArtist } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AppointmentDetail } from "../../common/AppointmentDetail/AppointmentDetail";

export const UserPanelAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState([]);
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
    if (user.length === 0) {
      getAllUsers()
        .then((response) => {
          setUser(response.data.Users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [user]);

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
  user.forEach((element) => {
    if (element.user_name === decoded.user_name) {
      encontrado = true;
      idEncontrada = element.id;
    }
  });

  let filteredAppointments = [];

  if (encontrado) {
    filteredAppointments = appointments.filter(
      (appointment) => appointment.client === idEncontrada
    );
  }

  const getTattooArtistName = (artistId) => {
    const artist = tattooArtist.find((artist) => artist.id === artistId);
    return artist ? artist.user_name : "";
  };

  const handleAppointmentClick = (appointment) => {
    
    const appointmentDetails = {
      id: appointment.id,
      title: appointment.title,
      description: appointment.description,
      tattoo_artist: getTattooArtistName(appointment.tattoo_artist),
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
                    {getTattooArtistName(appointment.tattoo_artist)}
                  </div>
                  <div className="buttonEdit"> Edit</div>
                  <div className="buttonDelete"> X</div>
                </div>
              ))}
            </div>
            <div
              className="buttonBack"
              onClick={() => navigate("/myUserPanel")}
            >
              Volver al panel
            </div>
          </>
        ) : (
          <div>No tienes citas pendientes</div>
        )}
      </div>
    </>
  );
};