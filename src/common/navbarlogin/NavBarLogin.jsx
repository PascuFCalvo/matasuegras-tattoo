import { jwtDecode } from "jwt-decode";
import "./NavbarLogin.css";
import { useNavigate } from "react-router-dom";

export const NavbarLogin = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');
  console.log(isLoggedIn);

  let decoded = {};
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  const userLevel = localStorage.getItem('level');
  console.log(userLevel);

  const botones = isLoggedIn
    ? [
        {
          id: 1,
          nombre: `LOG OUT`,
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
            className={`botonNavBarLogin ${boton.nombre === "LOG OUT" ? 'logout' : ''}`}
            key={boton.id}
            onClick={boton.onClick ? boton.onClick : () => navigate(boton.path)}
          >
            {boton.nombre}
          </div>
        );
      })}
      {isLoggedIn && (
        <div className="botonNavBarLogin2">
          {decoded.user_name} 
        </div>
      )}
    </div>
  );
};
