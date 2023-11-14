import { useEffect, useState } from "react";
import "./MainUserPanelAppointments.css";
import { getAllUsers, getAppointments, getTattooArtist } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const UserPanelAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState([]);
  const [tattooArtist, setTattooArtist] = useState([]);

  const isLoggedIn = localStorage.getItem('token');
  console.log(isLoggedIn)

  let decoded = {};
  
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
    localStorage.setItem("nombre", decoded.user_name);
    console.log(decoded.user_name)
  }

  useEffect(() => {
    if (tattooArtist.length === 0) {
      getTattooArtist()
        .then((response) => {
          setTattooArtist(response.data.Artists);
          console.log(tattooArtist)
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
          console.error("Error fetching tattoo artist:", error);
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

  console.log(user);
  console.log(appointments);

  let encontrado = false;
  let idEncontrada = 0;
  user.forEach(element => {
    if (element.user_name === decoded.user_name) {
      console.log('Encontrado:', element);
      encontrado = true;
      idEncontrada = element.id
    }
  });

  console.log(idEncontrada)

  let filteredAppointments = [];

  if (encontrado) {
    filteredAppointments = appointments.filter(
      (appointment) => appointment.client === idEncontrada
    );
  }

  return (
    <>
      <div className="ListUsers">
        <div className="panelAdminTitle">LISTADO DE CITAS</div>
        {filteredAppointments.length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {filteredAppointments.map((appointment) => (
                <div className="userRow" key={appointment.id}>
                  <div className="id">{appointment.id}</div>
                  <div className="userName">{appointment.title}</div>
                  <div className="email">{appointment.description}</div>
                  <div className="phone">
                  {tattooArtist[appointment.tattoo_artist].user_name}
                  </div>
                  <div className="created_at">{appointment.created_at}</div>
                  <div className="updated_at">{appointment.updated_at}</div>
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