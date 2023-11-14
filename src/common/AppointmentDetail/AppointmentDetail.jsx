import { useEffect, useState } from "react";
import "./AppointmentDetail.css";
import { myDetailAppointments } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";

export const AppointmentDetail = () => {
   const appointmentId = localStorage.getItem("appointmentId");
 
   const isLoggedIn = localStorage.getItem("token");
   const tokendecoded = jwtDecode(isLoggedIn);
   console.log(tokendecoded.id);
 
   const [myAppointment, setMyAppointment] = useState([]);
 
   useEffect(() => {
     if (myAppointment.length === 0) {
       const body = { "id": parseInt(tokendecoded.id) };
       
 
       myDetailAppointments(body)
         .then((response) => {
           setMyAppointment(response.data.myAppointments);
           console.log(response.data.myAppointments);
         })
         .catch((error) => {
           console.error("Error fetching appointments:", error);
         });
     }
   }, [myAppointment.length, tokendecoded.id]);
 
   const filteredAppointment = myAppointment.find(
     (appointment) => appointment.Appointment_id === appointmentId
   );
      
   return (
     <div className="detailedCardBody">
       {filteredAppointment ? (
         <div>
           <div key={filteredAppointment.Appointment_id}>
             <div>{filteredAppointment.Client}</div>
             <div>{filteredAppointment.Tattoo_artist}</div>
             <div>{filteredAppointment.appointment_date}</div>
             <div>{filteredAppointment.appointment_turn}</div>
             <div>{filteredAppointment.type}</div>
             <div>{filteredAppointment.description}</div>
             <div>{filteredAppointment.title}</div>
           </div>
         </div>
       ) : (
         <div>No se encontró la cita con el ID proporcionado.</div>
       )}
     </div>
   );
 };
