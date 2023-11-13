import { useEffect, useState } from "react";
import "./SuperAdminAppointments.css";
import { deleteAnAppointment, getAllUsers, getAppointments, getTattooArtist } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const SuperAdminAppointments = () => {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [tattooArtist, setTattooArtist] = useState([]);
  const [client, setClient] = useState([])

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
  console.log(tattooArtist)

  useEffect(() => {
    if (client.length === 0) {
      getAllUsers()
        .then((response) => {
          setClient(response.data.Users);
        })
        .catch((error) => {
          console.error("Error fetching tattoo artist:", error);
        });
    }
  },);
  console.log(client)

  
  const deleteAppointment = (id) =>{
    
    let body = {"id": id}
    console.log(body)

    deleteAnAppointment(body)
    .then(resultado => {
      console.log(resultado);

      setTimeout(() => {
        navigate("/superAdmin/superAdminAppointments");
      }, 2000);
    })
    .catch(error => console.log(error.message));
  }

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
              <div className = "phone"> {tattooArtist[appointment.tattoo_artist].user_name}</div>
              <div className = "level">{client[appointment.client].user_name}</div>
              <div className = "created_at">{appointment.created_at}</div>
              <div className = "updated_at">{appointment.updated_at}</div>
              <div className = "buttonEdit"> Edit</div>
              <div className="buttonDelete" 
              onClick={() => deleteAppointment(appointment.id)}
              >
                    X
                  </div>
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
