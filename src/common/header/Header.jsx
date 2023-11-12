import { BurguerMenu } from "../BurguerMenu/BurguerMenu";
import { LogoChiquito } from "../logochiquito/LogoChiquito";
import { Navbar } from "../navbar/Navbar";
import { NavbarLogin } from "../navbarlogin/NavBarLogin";
import { NavbarSocials } from "../socials/Socials";

import "./Header.css";


export const Header = () => {
   
   
   return (
      <> 
      <div className = "header">
         <LogoChiquito />
         <BurguerMenu />
         <Navbar />
         <NavbarLogin textColor="crimson" />
         <NavbarSocials />
      </div>
         
      </>
     
        
   )

}