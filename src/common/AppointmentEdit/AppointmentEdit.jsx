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
          <div className="editID">TU NUMERO DE CITA: {id}</div>
          <div className="edittTitle"> {title}</div>
          <div className="editDesc"> {description}</div>
          <div className="editTattoo">TATUADOR: {tattoo_artist}</div>
          <div className="editClient">CLIENTE: {client}</div>
          <div className="editDate"> Fecha: {date}</div>
          <div className="editTurn"> Turn: {turn}</div>
        </>
      }
      <button className="buttonClose" onClick={handleHideClick}>
        Cerrar
      </button>
    </div>
  );
};
