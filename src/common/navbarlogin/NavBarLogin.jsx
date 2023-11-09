import "./NavbarLogin.css"
import {  useNavigate } from "react-router-dom";

export const NavbarLogin = () => {
  let botones = [
    {
      id: 1,
      nombre: "LOGIN",
      path:"/login"
    },
    {
      id: 2,
      nombre: "REGISTRATE",
      path:"/register"
    },
    
  ];

  const navigate = useNavigate();

  return (
    <div className = "navbarButtonsLogin">
      {botones.map((boton) => {
        return (
          <div className="botonNavBarLogin" key={boton.id} onClick={() => navigate(boton.path)} >
            {boton.nombre}
          </div>
        );
      })}
    </div>
  );
};
