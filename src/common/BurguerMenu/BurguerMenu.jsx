import { useState } from "react";
import "./BurguerMenu.css";
import { useNavigate } from "react-router-dom";

export const BurguerMenu = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const opciones = [
    { id: 1, nombre: "INICIO", onClick: () => navigate("/") },
    { id: 2, nombre: "ESTUDIO", onClick: ()  => navigate("/elestudio") },
    { id: 3, nombre: "TATUADORES", onClick: () => navigate("/tatuadores") },
    { id: 4, nombre: "GALERIA", onClick: () => navigate("/gallery") },
    { id: 5, nombre: "PEDIR CITA", onClick: () => navigate("/cita") },
    { id: 6, nombre: "CONTACTO", onClick: () => navigate("/contacto") },
  ];

  return (
    <div className="hamburguesa-menu">
      <div
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`opciones ${menuOpen ? "open" : ""}`}>
        {opciones.map((opcion) => (
          <div
            key={opcion.id}
            className="opcion"
            onClick={() => {
              opcion.onClick();
              closeMenu();
            }}
          >
            {opcion.nombre}
          </div>
        ))}
      </div>
    </div>
  );
};
