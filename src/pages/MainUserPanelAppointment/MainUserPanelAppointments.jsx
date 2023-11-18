import "./MainUserPanelAppointments.css";
import { useEffect, useState } from "react";
import { deleteAnAppointment, getAppointments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { AppointmentDetail } from "../../common/AppointmentDetail/AppointmentDetail";
import { EditAppointment } from "../../common/EditAppointment/EditAppointment";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

export const UserPanelAppointments = () => {
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const [appointments, setAppointments] = useState([]);
  const [nameToFilter, setNameToFilter] = useState();

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      console.log("No estás logeado");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      setNameToFilter(decoded.user_name);
      console.log(decoded.user_name)
      dispatch(login(decoded));
    }
  }, [dispatch, rdxUserData.credentials]);

  useEffect(() => {
    if (appointments.length === 0) {
      getAppointments(rdxUserData.credentials.token)
        .then((response) => {
          setAppointments(response.data.myAppointments);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [appointments, rdxUserData.credentials.token]);

  const filteredAppointments = () => {
    return appointments.filter(
      (appointment) => appointment.userAppointment.user_name === nameToFilter
    );
  };
  console.log(appointments)
  const handleAppointmentClick = (appointment) => {
    const appointmentDetails = {
      id: appointment.id,
      title: appointment.title,
      description: appointment.description,
      tattoo_artist: appointment.tattoArtistAppointment.user_name,
      client: appointment.userAppointment.user_name,
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
      tattoo_artist: appointment.tattoArtistAppointment.user_name,
      client: appointment.userAppointment.user_name,
      date: appointment.appointment_date,
      turn: appointment.appointment_turn,
    };

    setIsEditModalVisible(true);
    setSelectedAppointment(appointmentDetails);
  };

  const handleDeleteAppointmentClick = (appointment) => {
    let body = { id: appointment.id };
    console.log(body);
    alert(`vamos a borrar la id ${appointment.id}`);
    deleteAnAppointment(body)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          navigate("/MyUserPanel")
        }, 500);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
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
        {filteredAppointments().length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {filteredAppointments().map((appointment) => (
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
                      {appointment.tattoArtistAppointment.user_name}
                    </div>
                  </div>
                  <div className="deleteButtons">
                    <div
                      className="buttonEdit"
                      onClick={() => handleEditAppointmentClick(appointment)}
                    >
                      Edit
                    </div>
                    <div
                      className="buttonDelete"
                      onClick={() => handleDeleteAppointmentClick(appointment)}
                    >
                      X
                    </div>
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
