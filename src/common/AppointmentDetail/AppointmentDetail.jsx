import { useState } from "react";
import "./AppointmentDetail.css";
import { jwtDecode } from "jwt-decode";
import matasuegras from "../../images/matasuegras.png"

export const AppointmentDetail = () => {
  const isLoggedIn = localStorage.getItem("token");
  const tokendecoded = jwtDecode(isLoggedIn);
  console.log(tokendecoded);

  const [isVisible, setIsVisible] = useState(true);

  const selected = localStorage.getItem("selectedAppointment");
  const parsedSelected = selected ? JSON.parse(selected) : null;
  console.log(parsedSelected);

  const handleHideClick = () => {
    // Borrar el contenido del localStorage "selectedAppointment"
    localStorage.removeItem("selectedAppointment");

    // Ocultar el componente
    setIsVisible(false);
  };

  return (
    <div className={`detailedCardBody ${isVisible ? "visible" : "hidden"}`}>
      <img className = "imagenCita" src={matasuegras} alt="Matasuegras" />
      {parsedSelected && (
        <>
          <div>TU NUMERO DE CITA: {parsedSelected.id}</div>
          <div> {parsedSelected.title}</div>
          <div> {parsedSelected.description}</div>
          <div> TATUADOR: {parsedSelected.tattoo_artist}</div>
          
          
        </>
      )}
      <button onClick={handleHideClick}>Cerrar</button>
    </div>
  );
};