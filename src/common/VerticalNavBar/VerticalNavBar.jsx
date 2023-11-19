import "./VerticalNavbar.css";
import { useNavigate } from "react-router-dom";

export const VerticalNavbar = () => {
  let botones = [
    {
      id: 1,
      nombre: "INICIO",
      path: "../",
    },
    {
      id: 2,
      nombre: "ESTUDIO",
      path: "../elestudio",
    },
    {
      id: 3,
      nombre: "TATUADORES",
      path: "../tatuadores",
    },
    {
      id: 4,
      nombre: "GALERIA",
      path: "../gallery",
    },
    {
      id: 5,
      nombre: "PEDIR CITA",
      path: "../cita",
    },
    {
      id: 6,
      nombre: "CONTACTO",
      path: "../contacto",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="VerticalnavbarButtons">
      {botones.map((boton) => {
        return (
          <div
            className="VerticalbotonNavBar"
            key={boton.id}
            onClick={() => navigate(boton.path)}
          >
            {boton.nombre}
          </div>
        );
      })}
    </div>
  );
};
