import { useEffect, useState } from "react";
import "./SuperAdminAppointments.css";
import { getAppointments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const SuperAdminAppointments = () => {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

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

  console.log(appointments);

  return (
    <>
    <div className="ListUsers">
         <div className="panelAdminTitle">LISTADO DE CITAS</div>
        {appointments.length > 0 ? (
          <><div className="User" >
            <div className = "UserInfo"></div>
            {appointments.map((appointment) => (
              <div className = "userRow" key={appointment.id}>
              <div className = "id">{appointment.id}</div>
              <div className = "userName">{appointment.title}</div>
              <div className = "email">{appointment.description}</div>
              <div className = "phone">Artista {appointment.tattoo_artist}</div>
              <div className = "level">Cliente {appointment.client}</div>
              <div className = "created_at">{appointment.created_at}</div>
              <div className = "updated_at">{appointment.updated_at}</div>
              <div className = "buttonEdit"> Edit</div>
              <div className = "buttonDelete"> X</div>
              </div>
              
              
            ))}
          </div>
          <div className = "buttonBack" onClick={() => 
          navigate("/superAdmin")
          }>Volver al panel</div></>
          
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>
    </>
  );
};
