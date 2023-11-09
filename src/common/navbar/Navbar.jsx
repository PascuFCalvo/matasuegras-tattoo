import "./Navbar.css"
import {  useNavigate } from "react-router-dom";


export const Navbar = () => {
  let botones = [
    {
      id: 1,
      nombre: "INICIO",
      path: "/"
    },
    {
      id: 2,
      nombre: "ESTUDIO",
      
    },
    {
      id: 3,
      nombre: "TATUADORES",
    },
    {
      id: 4,
      nombre: "GALERIA",
    },
    {
      id: 5,
      nombre: "PEDIR CITA",
    },
    {
      id: 6,
      nombre: "CONTACTO",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className = "navbarButtons">
      {botones.map((boton) => {
        return (
          <div className="botonNavBar" key={boton.id} onClick={() => 
          navigate(boton.path)
          } >
            {boton.nombre}
          </div>
        );
      })}
    </div>
  );
};
