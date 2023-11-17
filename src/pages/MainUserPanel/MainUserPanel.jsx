import { useNavigate } from "react-router-dom";
import "./MainUserPanel.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";

export const MainUserPanel = () => {
  const navigate = useNavigate();

  const destination = "UserPanelAppointments";

  return (
    <>
      <div className="BackgroundMainSuperAdmin">
        <div className="headerAdminPanel"></div>
        <div className="titleAdmin">PANEL DE USUARIO</div>
        <div className="infoTatuador">NOMBRE: {"pepe"}</div>
        <div className="infoTatuador">EMAIL: {"pepe@pepe.com"}</div>
        <div className="infoTatuador">PHONE: {"666666666"}</div>
        <div className="buttons">
          <div className="buttonUsers" onClick={() => navigate(destination)}>
            {" "}
            Ver Citas{" "}
          </div>
        </div>
      </div>
      <FooterBlack />
    </>
  );
};
