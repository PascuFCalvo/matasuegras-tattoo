
import { useNavigate } from "react-router-dom";
import "./MainUserPanel.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";


export const MainUserPanel = () => {

   const navigate = useNavigate();

   
   const destination = "UserPanelAppointments"

 
  return (
    <>
    
    <div className = "BackgroundMainSuperAdmin">
      <div className="headerAdminPanel"></div>
      <div className = "titleAdmin">PANEL DE USUARIO</div>
      <div className = "buttons">
        
      <div className = "buttonUsers" onClick={() => 
          navigate(destination)
          }> Ver Citas </div>
      </div>
      

      </div>
      <FooterBlack />
      </>
  );
};
