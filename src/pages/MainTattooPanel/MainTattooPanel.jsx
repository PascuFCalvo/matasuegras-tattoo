
import { useNavigate } from "react-router-dom";
import "./MainTattooPanel.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { jwtDecode } from "jwt-decode";


export const MainTattooPanel = () => {

  const isLoggedIn = localStorage.getItem('token');
  let decoded = {};
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

   const navigate = useNavigate();

   
   const destination2 = "tattooArtistAppointments"

 
  return (
    <>
    
    <div className = "BackgroundMainSuperAdmin">
      <div className="headerAdminPanel"></div>
      <div className = "titleAdmin">PANEL DE TATUADOR</div>
      <div className = "infoTatuador">NOMBRE: {decoded.user_name} || EMAIL {decoded.email}</div>
      <div className = "buttons">
         {/* <div className = "buttonUsers" onClick={() => 
          navigate(destination1)
          }> Ver Usuarios </div> */}
      <div className = "buttonUsers" onClick={() => 
          navigate(destination2)
          }> Ver Citas </div>
      </div>
      

      </div>
      <FooterBlack />
      </>
  );
};
