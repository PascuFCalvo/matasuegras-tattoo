import { StoreInfo } from "../storeinfo/StoreInfo";
import "./Footer.css";


export const Footer = ({ paddingTop }) => {
   
   
   return (
      <> 
      <div className = "footer" style={{ paddingTop : paddingTop }}>
         <StoreInfo />
      </div>
      
      </>
     
        
   )

}