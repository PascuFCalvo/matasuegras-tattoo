import "./Socials.css";
import FB from "../../assets/FB.png";
import YT from "../../assets/YT.png";
import IG from "../../assets/IG.png";

export const NavbarSocials = () => {
  return (
    <div className="navbarButtonsSocials">
      <a
        draggable="false"
        className="botonNavBarSocials"
        href="https://www.facebook.com/Nolandtattooparlour"
      >
        <img src={FB} alt="ig logo" />
      </a>
      <a
        draggable="false"
        className="botonNavBarSocials"
        href="https://www.instagram.com/nolandtattooparlour/"
      >
        <img src={IG} alt="ig logo" />
      </a>
      <a
        draggable="false"
        className="botonNavBarSocials"
        href="https://www.youtube.com/@PonyLawson"
      >
        <img src={YT} alt="yt logo" />
      </a>
    </div>
  );
};
