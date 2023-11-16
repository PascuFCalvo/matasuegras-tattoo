import { useNavigate } from "react-router-dom";
import "./MainSuperAdmin.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const MainSuperAdmin = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");
  let decoded = {};

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  },);

  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  const destination1 = "superAdminUsers";
  const destination2 = "superAdminAppointments";

  return (
    <>
      <div className="BackgroundMainSuperAdmin">
        <div className="headerAdminPanel"></div>
        <div className="titleAdmin">PANEL DE ADMIN DE THE BLACK ALIEN</div>
        <div className="buttons">
          <div className="buttonUsers" onClick={() => navigate(destination1)}>
            Ver Usuarios
          </div>
          <div className="buttonUsers" onClick={() => navigate(destination2)}>
            Ver Citas
          </div>
        </div>
      </div>
      <FooterBlack />
    </>
  );
};
