import { useNavigate } from "react-router-dom";
import "./MainSuperAdmin.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const MainSuperAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      console.log("No estás logeado");
      navigate("/login");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      dispatch(login(decoded));
    }
  }, [dispatch, rdxUserData.credentials]);

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
