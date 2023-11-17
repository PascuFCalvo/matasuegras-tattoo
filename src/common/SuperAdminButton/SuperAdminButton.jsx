import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../../pages/userSlice";

import "./SuperAdminButton.css";

export const SuperAdminButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      console.log("No estás logeado");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      console.log(decoded);
      dispatch(login(decoded));
      setDestination(decoded.level);
    }
  }, [dispatch, rdxUserData.credentials]);

  let buttonText;
  let url;

  if (destination === "black_alien") {
    url = "/superAdmin";
    buttonText = "Go to Superadmin panel";
  } else if (destination === "user") {
    url = "/MyUserPanel";
    buttonText = "Go to My User Panel";
  } else if (destination === "tattoo") {
    url = "/myTattooPanel";
    buttonText = "Go to My Tattoo Panel";
  }

  return destination ? (
    <div className="superAdminButton" onClick={() => navigate(url)}>
      {buttonText}
    </div>
  ) : (
    <div>
      Error: No se pudo determinar el destino. Por favor, inicia sesión.
    </div>
  );
};
