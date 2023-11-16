import { useEffect, useState } from "react";
import "./SuperAdminAppointments.css";
import {
  getAllUsers,
  getAppointments,
  getTattooArtist,
} from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { AppointmentDetail } from "../../common/AppointmentDetail/AppointmentDetail";
import { EditAppointment } from "../../common/EditAppointment/EditAppointment";
import { jwtDecode } from "jwt-decode";

export const SuperAdminAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [tattooArtist, setTattooArtist] = useState([]);
  const [client, setClient] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const isLoggedIn = localStorage.getItem('token');
  let decoded = {};
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  if (!isLoggedIn) {
    navigate("/")
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
    if (client.length === 0) {
      getAllUsers()
        .then((response) => {
          setClient(response.data.Users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [client]);

  useEffect(() => {
    if (appointments.length === 0) {
      getAppointments()
        .then((response) => {
          setAppointments(response.data.Appointments);
        })
        .catch((error) => {
          console.error("Error fetching tattoos:", error);
        });
    }
  }, [appointments]);

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
      client: client[appointment.client].user_name,
      date: appointment.appointment_date,
      type: appointment.type,
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

  const handleEditDetailVisibilityChange = (state) => {
    setIsEditModalVisible(state);
  };


  const handleEditAppointmentClick = (appointment) => {
    const appointmentDetails = {
      id: appointment.id,
      title: appointment.title,
      description: appointment.description,
      trabajo: appointment.type,
      tattoo_artist: getTattooArtistName(appointment.tattoo_artist),
      client:client[appointment.client].user_name,
      date: appointment.appointment_date,
      turn: appointment.appointment_turn,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };
    setIsEditModalVisible(true);
    setSelectedAppointment(appointmentDetails);
  };

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
        {appointments.length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {appointments.map((appointment) => (
                <div className="completeRow" key={appointment.id}><div
                  className="userRow"
                  onClick={() => handleAppointmentClick(appointment)}
                  
                >
                  <>
                    <div className="id">{appointment.id}</div>
                    <div className="userName">{appointment.title}</div>
                    <div className="email">{appointment.description}</div>
                    <div className="phone">
                      {getTattooArtistName(appointment.tattoo_artist)}
                    </div>
                    <div className="level">
                      {client[appointment.client].user_name}
                    </div>
                  </>
                  
                  
                </div>
                <div className="deleteButtons"><div className="buttonEdit" onClick={() => handleEditAppointmentClick(appointment)}> Edit</div>
                  <div className="buttonDelete">X</div></div></div>
                
              ))}
            </div>
            <div className="buttonBack" onClick={() => navigate("/superAdmin")}>
              Volver al panel
            </div>
          </>
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>
    </>
  );
};


