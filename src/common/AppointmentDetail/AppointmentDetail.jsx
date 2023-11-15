import  { useEffect, useState } from "react";
import "./AppointmentDetail.css";
import { jwtDecode } from "jwt-decode";
import matasuegras from "../../images/matasuegras.png";

export const AppointmentDetail = () => {
  const isLoggedIn = localStorage.getItem("token");
  const tokendecoded = jwtDecode(isLoggedIn);
  console.log(tokendecoded);

  const [isVisible, setIsVisible] = useState(true);
  const [localStorageInfo, setLocalStorageInfo] = useState(null);

  useEffect(() => {
    
    
    const selected = localStorage.getItem("selectedAppointment");
    const parsedSelected = selected ? JSON.parse(selected) : null;

    setLocalStorageInfo(parsedSelected);

  }, []); 



  const handleHideClick = () => {
    localStorage.removeItem("selectedAppointment");
    setIsVisible(false);
  };

  return (
    <div className={`detailedCardBody ${isVisible ? "visible" : "hidden"}`}>
      <img className="imagenCita" src={matasuegras} alt="Matasuegras" />
      {localStorageInfo && (
        <>
          <div className="appointmentID">
            {" "}
            TU NUMERO DE CITA: {localStorageInfo.id}
          </div>
          <div className="appointmentTitle"> {localStorageInfo.title}</div>
          <div className="appointmentDesc"> {localStorageInfo.description}</div>
          <div className="appointmentTattoo">
            {" "}
            TATUADOR: {localStorageInfo.tattoo_artist}
          </div>
          <div className="appointmentDate"> Fecha: {localStorageInfo.date}</div>
          <div className="appointmentTurn"> Turn: {localStorageInfo.turn}</div>
        </>
      )}
      <button className="buttonClose" onClick={handleHideClick}>
        Cerrar
      </button>
    </div>
  );
};
