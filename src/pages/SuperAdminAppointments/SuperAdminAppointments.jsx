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
  const [editing, setEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState({});
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

        // Actualizar el estado local después de la eliminación exitosa
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );

        const buttonRect = document.querySelector(
          `.buttonDelete[data-index="${index}"]`
        ).getBoundingClientRect();

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
        // Manejar el error según sea necesario
      });
    }

  const editarCita = (appointment) => {
    setEditing(true);
    setEditedAppointment({ ...appointment });
  };

  const guardarCambios = () => {
    // Aquí deberías llamar al método PUT para modificar la base de datos con la cita editada
    setEditing(false);
  };

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
  });

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
  });

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
                  {editing && editedAppointment.id === appointment.id ? (
                    <>
                      <input
                        type="text"
                        value={editedAppointment.title}
                        onChange={(e) =>
                          setEditedAppointment({
                            ...editedAppointment,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editedAppointment.description}
                        onChange={(e) =>
                          setEditedAppointment({
                            ...editedAppointment,
                            description: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editedAppointment.tattoo_artist}
                        onChange={(e) =>
                          setEditedAppointment({
                            ...editedAppointment,
                            tattoo_artist: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editedAppointment.client}
                        onChange={(e) =>
                          setEditedAppointment({
                            ...editedAppointment,
                            client: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editedAppointment.created_at}
                        onChange={(e) =>
                          setEditedAppointment({
                            ...editedAppointment,
                            created_at: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editedAppointment.updated_at}
                        onChange={(e) =>
                          setEditedAppointment({
                            ...editedAppointment,
                            updated_at: e.target.value,
                          })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <div className="id">{appointment.id}</div>
                      <div className="userName">{appointment.title}</div>
                      <div className="email">{appointment.description}</div>
                      <div className="phone">
                        {tattooArtist[appointment.tattoo_artist].user_name}
                      </div>
                      <div className="level">
                        {client[appointment.client].user_name}
                      </div>
                      <div className="created_at">{appointment.created_at}</div>
                      <div className="updated_at">{appointment.updated_at}</div>
                    </>
                  )}
                  <div
                    className="buttonEdit"
                    onClick={
                      editing ? guardarCambios : () => editarCita(appointment)
                    }
                  >
                    {editing && editedAppointment.id === appointment.id
                      ? "Guardar"
                      : "Edit"}
                  </div>
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
