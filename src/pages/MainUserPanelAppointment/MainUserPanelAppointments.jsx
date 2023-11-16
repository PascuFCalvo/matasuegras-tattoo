import { useEffect, useState } from "react";
import "./MainUserPanelAppointments.css";
import { deleteAnAppointment, getAllUsers, getAppointments, getTattooArtist } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AppointmentDetail } from "../../common/AppointmentDetail/AppointmentDetail";
import { EditAppointment } from "../../common/EditAppointment/EditAppointment";

export const UserPanelAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState([]);
  const [tattooArtist, setTattooArtist] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const isLoggedIn = localStorage.getItem('token');
  let tokendecoded = {};

  if (isLoggedIn) {
    tokendecoded = jwtDecode(isLoggedIn);
    localStorage.setItem("level", tokendecoded.level);
    localStorage.setItem("nombre", tokendecoded.user_name);
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
    if (element.user_name === tokendecoded.user_name) {
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
      type: appointment.type,
      tattoo_artist: getTattooArtistName(appointment.tattoo_artist),
      client:tokendecoded.user_name,
      date: appointment.appointment_date,
      turn: appointment.appointment_turn,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };
    setIsModalVisible(true);
    setSelectedAppointment(appointmentDetails);
  };

  const handleDetailVisibilityChange = (state) => {
    setIsModalVisible(state);
  };

  const handleEditAppointmentClick = (appointment) => {
    const appointmentDetails = {
      id: appointment.id,
      title: appointment.title,
      description: appointment.description,
      trabajo: appointment.type,
      tattoo_artist: getTattooArtistName(appointment.tattoo_artist),
      client:tokendecoded.user_name,
      date: appointment.appointment_date,
      turn: appointment.appointment_turn,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };
    setIsEditModalVisible(true);
    setSelectedAppointment(appointmentDetails);
  };

  const handleEditDetailVisibilityChange = (state) => {
    setIsEditModalVisible(state);
  };
  
  const handleDeleteAppointmentClick = (appointment) => {
    let body = {"id": appointment.id}
    console.log(body)
    alert(`vamos a borrar la id ${appointment.id}`)
    deleteAnAppointment(body)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error("Error fetching appointments:", error);
    });
  }

  
  


  return (
    <>
      <AppointmentDetail
        selected={selectedAppointment}
        visibility={isModalVisible}
        setVisibility={handleDetailVisibilityChange}
      />

      <EditAppointment
        selected={selectedAppointment}
        visibility={isEditModalVisible}
        setVisibility={handleEditDetailVisibilityChange}
      />

      <div className="ListUsers">
        <div className="panelAdminTitle">LISTADO DE CITAS</div>
        {filteredAppointments.length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {filteredAppointments.map((appointment) => (
                <div className="completeRow" key={appointment.id}>
                  <div
                    className="userRow"
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <div className="id">{appointment.id}</div>
                    <div className="userName">{appointment.type}</div>
                    <div className="userName">{appointment.title}</div>
                    <div className="email">{appointment.description}</div>
                    <div className="phone">
                      {getTattooArtistName(appointment.tattoo_artist)}
                    </div>
                  </div>
                  <div className="deleteButtons">
                    <div
                      className="buttonEdit"
                      onClick={() => handleEditAppointmentClick(appointment)}
                    >
                      Edit
                    </div>
                    <div className="buttonDelete" onClick={() => handleDeleteAppointmentClick(appointment)}>X</div>
                  </div>
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
