import "./NavbarLogin.css";
import { useNavigate } from "react-router-dom";

export const NavbarLogin = () => {
  const navigate = useNavigate();

  // Verificar si el usuario ha iniciado sesión
  const isLoggedIn = localStorage.getItem('token'); // Asumiendo que tu token se llama 'token'

  let botones = isLoggedIn
    ? [
        {
          id: 1,
          nombre: "LOG OUT",
          onClick: () => {
            
            localStorage.removeItem('token');
            
            navigate("/login");
          },
        },
      ]
    : [
        {
          id: 1,
          nombre: "LOGIN",
          path: "/login",
        },
        {
          id: 2,
          nombre: "REGISTRATE",
          path: "/register",
        },
      ];

  return (
    <div className="navbarButtonsLogin">
      {botones.map((boton) => {
        return (
          <div
            className="botonNavBarLogin"
            key={boton.id}
            onClick={boton.onClick ? boton.onClick : () => navigate(boton.path)}
          >
            {boton.nombre}
          </div>
        );
      })}
    </div>
  );
};