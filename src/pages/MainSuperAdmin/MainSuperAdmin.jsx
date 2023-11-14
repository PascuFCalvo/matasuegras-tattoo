
import { useNavigate } from "react-router-dom";
import "./MainSuperAdmin.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";



export const MainSuperAdmin = () => {

  
  const navigate = useNavigate();
 
  const destination1 = "superAdminUsers";
  const destination2 = "superAdminAppointments";

  return (
    <>
      <div className="BackgroundMainSuperAdmin">
        <div className="headerAdminPanel"></div>
        <div className="titleAdmin">PANEL DE ADMIN DE THE BLACK ALIEN</div>
        <div className="buttons">
          <div
            className="buttonUsers"
            onClick={() => navigate(destination1)}
          >
            Ver Usuarios
          </div>
          <div
            className="buttonUsers"
            onClick={() => navigate(destination2)}
          >
            Ver Citas
          </div>
        </div>
      </div>
      <FooterBlack />
    </>
  );
};

