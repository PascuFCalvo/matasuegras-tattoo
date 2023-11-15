// import  {  useEffect, useState } from "react";
import "./AppointmentEdit.css";
import { jwtDecode } from "jwt-decode";
import matasuegras from "../../images/matasuegras.png";

export const AppointmentEdit = ({ selected, visibility, setVisibility }) => {
  const isLoggedIn = localStorage.getItem("token");
  const tokendecoded = jwtDecode(isLoggedIn);
  console.log(tokendecoded)
  const { id, title, description, tattoo_artist,client, date, turn } = selected;

  const handleHideClick = () => {
    
    setVisibility(false);
  };

  return (
    <div className={`detailedCardBody ${visibility ? "visible" : "hidden"}`}>
      <img className="imagenCita" src={matasuegras} alt="Matasuegras" />
      {
        <>
          <div>PANEL EDICION DE CITAS</div>
          <div className="appointmentID">TU NUMERO DE CITA: {id}</div>
          <div className="appointmentTitle"> {title}</div>
          <div className="appointmentDesc"> {description}</div>
          <div className="appointmentTattoo">TATUADOR: {tattoo_artist}</div>
          <div className="appointmentTattoo">CLIENTE: {client}</div>
          <div className="appointmentDate"> Fecha: {date}</div>
          <div className="appointmentTurn"> Turn: {turn}</div>
        </>
      }
      <button className="buttonClose" onClick={handleHideClick}>
        Cerrar
      </button>
    </div>
  );
};
