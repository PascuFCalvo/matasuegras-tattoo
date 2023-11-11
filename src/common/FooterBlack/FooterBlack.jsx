import { UnderFooter } from "../CustomInput/UnderFooter/UnderFooter";
import { VerticalNavbar } from "../VerticalNavBar/VerticalNavBar";
import "./FooterBlack.css";
import { InstagramEmbed } from "react-social-media-embed";

export const FooterBlack = () => {
  return (
    <>
      <div className="footerBlack">
        <div className="titleFooter">
          <div> SOBRE MATASUEGRAS</div>
          <div> SITE MAPS</div>
          <div> DONDE ESTAMOS</div>
          <div> INSTAGRAM</div>
        </div>

        <div className="infoFooter">

        


          <div>
            Somos un concepto único como estudio de tatuaje en Valencia. Los
            mejores tatuadores/as nacionales e internacionales en la ciudad de
            Valencia.
          </div>

          <div className="columnaIzquierdaFooter">
            
          
            <span className="negrita">Dirección:</span> Gran Vía Fernando el
            Masonico 99, 46666 València<br></br>
            Teléfono: 960 07 69 24
            <br></br>
            WhatsApp: 679 329 519<br></br>
            Horario: De Martes a Sábado de
            11:00–14:00 y de 16:30–20:30
          
          </div>

        </div>

        <div className="googleMapFooterBlack">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.7821087224706!2d-0.38127211114498555!3d39.4742509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4d7bb82999%3A0x47a5da1f8817c23f!2sADEIT%20-%20Fundaci%C3%B3n%20Universidad-Empresa!5e0!3m2!1ses!2ses!4v1699693782796!5m2!1ses!2ses"
            width="350"
            height="350"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="instagram" style={{ display: "flex", justifyContent: "center" }}>
          <InstagramEmbed
            url="https://www.instagram.com/p/Cy3yFhJIfcz/?hl=es"
            width={350}
          />
        </div>
        <div className = "verticalNavbar" ><VerticalNavbar /></div>
        
      </div>
      <UnderFooter />
    </>
  );
};
