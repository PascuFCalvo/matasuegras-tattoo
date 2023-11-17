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


  let [nombreBoton, setNombreBoton] = useState()

  useEffect(() => {
    if (!rdxUserData.credentials.token) {  
      console.log("No estás logeado");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      dispatch(login(decoded));
      setNombreBoton(decoded.user_name);
    }
  }, [dispatch, rdxUserData.credentials.token]);

  

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear user data
    navigate("/login");
  };

  const botones = rdxUserData.credentials.token
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
            className={`botonNavBarLogin ${boton.nombre === "LOG OUT" ? 'logout' : ''}`}
            key={boton.id}
            onClick={boton.onClick}
          >
            {boton.nombre}
          </div>
        );
      })}
      {rdxUserData.credentials.token && (
        <div className="botonNavBarLogin2">
          {nombreBoton}
        </div>
      )}
    </div>
  );
};
