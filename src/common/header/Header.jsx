import { LogoChiquito } from "../logochiquito/LogoChiquito";
import { Navbar } from "../navbar/navbar";
import { NavbarLogin } from "../navbarlogin/NavBarLogin";
import { NavbarSocials } from "../socials/socials";
import "./Header.css";


export const Header = () => {
   
   
   return (
      <> 
      <div className = "header">
         <LogoChiquito />
         <Navbar />
         <NavbarLogin />
         <NavbarSocials />
      </div>
         
      </>
     
        
   )

}