import "./SuperAdminButton.css"
import {   useNavigate } from "react-router-dom";


export const SuperAdminButton = () => {

   const navigate = useNavigate();

   const destination = "superAdmin"


   return (
      <>
         <div className = "superAdminButton" onClick={() => 
          navigate(destination)
          } >Go to Superadmin panel</div>
      </>
   )
}