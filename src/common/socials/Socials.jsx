import "./Socials.css";
import FB from "../../assets/FB.png";
import YT from "../../assets/IG.png";
import IG from "../../assets/YT.png";

export const NavbarSocials = () => {
  return (
    <div className="navbarButtonsSocials">
      
      <div className="botonNavBarSocials">
        <img src={FB} alt="fb logo" />
      </div>
      <div className="botonNavBarSocials">
        <img src={YT} alt="yt logo" />
      </div>
      <div className="botonNavBarSocials">
        <img src={IG} alt="ig logo" />
      </div>
      
    </div>
  );
};
