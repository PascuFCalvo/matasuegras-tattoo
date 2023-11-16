
import { useNavigate } from "react-router-dom";
import "./MainUserPanel.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";


export const MainUserPanel = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');
  let decoded = {};
  console.log(isLoggedIn)
  

  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  },);


   
   const destination = "UserPanelAppointments"

 
  return (
    <>
    
    <div className = "BackgroundMainSuperAdmin">
      <div className="headerAdminPanel"></div>
      <div className = "titleAdmin">PANEL DE USUARIO</div>
      <div className = "infoTatuador">NOMBRE: {decoded.user_name}</div>
      <div className = "infoTatuador">EMAIL: {decoded.email}</div>
      <div className = "infoTatuador">PHONE: {decoded.phone}</div>
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
