import { useEffect, useState } from "react";
import "./TattooArtistAppointments.css";
import { getAppointments, getTattooArtist } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const TattoArtistAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
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

  console.log(tattooArtist);
  console.log(appointments);

  let encontrado = false;
  let idEncontrada = 0;
  tattooArtist.forEach(tattooArtist => {
    if (tattooArtist.user_name === decoded.user_name) {
      console.log('Encontrado:', tattooArtist);
      encontrado = true;
      idEncontrada = tattooArtist.id
    }
  });

  console.log(idEncontrada)

  let filteredAppointments = [];

  if (encontrado) {
    filteredAppointments = appointments.filter(
      (appointment) => appointment.tattoo_artist === idEncontrada
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
                    Artista {appointment.tattoo_artist}
                  </div>
                  <div className="level">Cliente {appointment.client}</div>
                  <div className="created_at">{appointment.created_at}</div>
                  <div className="updated_at">{appointment.updated_at}</div>
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
