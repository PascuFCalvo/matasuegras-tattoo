import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData, login, logout } from "../../pages/userSlice";
import { jwtDecode } from "jwt-decode";
import "./NavbarLogin.css";

export const NavbarLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);

  const [token, setToken] = useState(rdxUserData.credentials.token);

  let [nombreBoton, setNombreBoton] = useState();

  useEffect(() => {
    setToken(rdxUserData.credentials.token);
  }, [rdxUserData.credentials.token]);

  useEffect(() => {
    if (!token) {
      console.log("No estás logeado");
    } else {
      navigate("/");
      const decoded = jwtDecode(token);
      dispatch(login(decoded));
      setNombreBoton(decoded.user_name);
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const botones = token
    ? [
        {
          id: 1,
          nombre: `LOG OUT`,
          onClick: handleLogout,
        },
      ]
    : [
        {
          id: 1,
          nombre: "LOGIN",
          onClick: () => {
            navigate("/login");
          },
        },
        {
          id: 2,
          nombre: "REGISTRATE",
          onClick: () => {
            navigate("/register");
          },
        },
      ];

  return (
    <div className="navbarButtonsLogin">
      {botones.map((boton) => {
        return (
          <div
            className={`botonNavBarLogin ${
              boton.nombre === "LOG OUT" ? "logout" : ""
            }`}
            key={boton.id}
            onClick={boton.onClick}
          >
            {boton.nombre}
          </div>
        );
      })}
      {token && <div className="botonNavBarLogin2">{nombreBoton}</div>}
    </div>
  );
};
