
import "./SuperAdminButton.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const SuperAdminButton = () => {
  const isLoggedIn = localStorage.getItem("token");
  console.log(isLoggedIn);

  let decoded = {};
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  const navigate = useNavigate();

  
  let destination, buttonText;

  if (decoded.level === "black_alien") {
    destination = "/superAdmin";
    buttonText = "Go to Superadmin panel";
  } else if (decoded.level === "user") {
    destination = "/MyUserPanel";
    buttonText = "Go to My User Panel";
  } else if (decoded.level === "tattoo") {
    destination = "/myTattooPanel";
    buttonText = "Go to My Tattoo Panel";
  }

  // Verifica si se debe mostrar el botón
  const shouldShowButton = destination && buttonText;

  return shouldShowButton ? (
    <div
      className="superAdminButton"
      onClick={() => navigate(destination)}
    >
      {buttonText}
    </div>
  ) : null;
};
