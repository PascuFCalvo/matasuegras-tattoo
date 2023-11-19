// import  {  useEffect, useState } from "react";
import "./AppointmentDetail.css";
import { jwtDecode } from "jwt-decode";
import matasuegras from "../../images/matasuegras.png";
import sento from "../../images/sento.jpg";

import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

export const AppointmentDetail = ({ selected, visibility, setVisibility }) => {
  
  const rdxUserData = useSelector(userData);
  const isLoggedIn = rdxUserData.credentials.token;
  const tokendecoded = jwtDecode(isLoggedIn);
  console.log(tokendecoded)
 
  const { id, title, description,type, tattoo_artist,client, date, turn } = selected;

  const handleHideClick = () => {
    
    setVisibility(false);
  };

  return (
    <div className={`detailedCardBody ${visibility ? "visible" : "hidden"}`}>
      <div className="cabeceraCard"><img className="imagenCita1" src={matasuegras} alt="Matasuegras" />
        <img className="imagenCita2" src={sento} alt="Matasuegras" /></div>
      
      {
        <div className="cardDetailCita">
          <div className="detailID">TU NUMERO DE CITA: <span className="crimson">{id}</span></div>
          <div className="detailTitle"> {title}</div>
          <div className="detailDesc"> {description}</div>
          <div className="detailWork"> TRABAJO:<span className="blanco">{type}</span></div>
          <div className="detailTattoo">TATUADOR: <span className="blanco">{tattoo_artist}</span></div>
          <div className="detailClient">CLIENTE: <span className="blanco">{client}</span></div>
          <div className="detailDate"> Fecha: <span className="blanco">{date}</span></div>
          <div className="detailTurn"> Turn: <span className="blanco">{turn}</span></div>
        </div>
      }
      <button className="buttonClose" onClick={handleHideClick}>
        Cerrar
      </button>
    </div>
  );
};
