import "./NavbarLogin.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const NavbarLogin = ({ textColor }) => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');
  console.log(isLoggedIn)

  let decoded = {};
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  const userLevel = localStorage.getItem('level');
  console.log(userLevel);

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
        {
          id: 2,
          nombre: decoded.user_name,
          onClick: () => {
            
            console.log("Button clicked for user: ", decoded.user_name);
          },
        },
      ]
    : [];

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

