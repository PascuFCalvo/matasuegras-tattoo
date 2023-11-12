import "./NavbarLogin.css";
import { useNavigate } from "react-router-dom";

export const NavbarLogin = ({ textColor }) => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');

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
            style={{ color: boton.nombre === "LOG OUT" ? textColor : '' }}
          >
            {boton.nombre}
          </div>
        );
      })}
    </div>
  );
};