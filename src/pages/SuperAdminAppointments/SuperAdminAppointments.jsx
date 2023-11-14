import { useEffect, useState } from "react";
import "./SuperAdminAppointments.css";
import {
  deleteAnAppointment,
  getAllUsers,
  getAppointments,
  getTattooArtist,
} from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const SuperAdminAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [tattooArtist, setTattooArtist] = useState([]);
  const [client, setClient] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messagePosition, setMessagePosition] = useState({ top: 0, left: 0 });

  const deleteAppointment = (id, index) => {
    let body = { id: id };
    console.log(body);

    deleteAnAppointment(body)
      .then((resultado) => {
        console.log(resultado);

        if (resultado.status !== 200) {
          throw new Error(resultado.statusText);
        }

        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );

        const buttonRect = document
          .querySelector(`.buttonDelete[data-index="${index}"]`)
          .getBoundingClientRect();

        setMessagePosition({
          top: buttonRect.top + window.scrollY + 25,
          left: buttonRect.right + window.scrollX + 100,
        });

        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error al eliminar cita:", error);
      });
  };

  useEffect(() => {
    if (tattooArtist.length === 0) {
      getTattooArtist()
        .then((response) => {
          setTattooArtist(response.data.Artists);
          console.log(response.data.Artists);
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
  console.log(client);

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
  console.log(appointments);

  const getTattooArtistName = (artistId) => {
    const artist = tattooArtist.find((artist) => artist.id === artistId);
    return artist ? artist.user_name : "";
  };

  return (
    <>
      <div className="ListUsers">
        <div className="panelAdminTitle">LISTADO DE CITAS</div>
        {appointments.length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {appointments.map((appointment) => (
                <div className="userRow" key={appointment.id}>
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
                    <div className="created_at">{appointment.created_at}</div>
                    <div className="updated_at">{appointment.updated_at}</div>
                  </>
                  <div className="buttonEdit"> Edit</div>
                  <div
                    className="buttonDelete"
                    onClick={() => deleteAppointment(appointment.id)}
                  >
                    X
                  </div>
                </div>
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
      {showMessage && (
        <div
          className={`popupMessage ${showMessage ? "show" : ""}`}
          style={{
            top: `${messagePosition.top}px`,
            left: `${messagePosition.left}px`,
          }}
        >
          Cita eliminada
        </div>
      )}
    </>
  );
};
