import "./DewisConsinInfo.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { useNavigate } from "react-router-dom";

export const DewisConsinInfo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="backGroundInfo">
        <div className="title"> DEWIS CONSIN BIO</div>
        <div className="cardTattooArtist">
          <div className="pictureInfoDC"></div>
          <div className="bio">
            <div className="titleBio"></div>
            <div className="textBio">
              Nacido en la Malvarrosa (Valencia) en 1998, rodeado de tatuajes
              talegueros, tribales macarras y rosarios.<br></br>
              Obsesionado con el dibujo desde que tengo uso de razón, pude dar
              mis primeros pasos en el mundo del tatuaje gracias a que mis
              amigos me regalaron un maletín con todos los materiales necesarios
              por mi 18 cumpleaños y, aunque hice algunas piezas pequeñas acabé
              dejándolo de lado durante años. Fue en 2020 cuando finalmente
              decidí dedicarme al tatuaje de forma profesional.<br></br>
              He tatuado de forma independiente hasta finales de 2022, cuando
              coincidí con Sento, que se interesó por mi trabajo y pasé a formar
              parte del increíble equipo de No Land Tattoo Parlour.<br></br>
              En cuanto a mi forma de trabajar suelo dibujar sin ninguna
              referencia y buscando desarrollar un estilo único y personal,
              normalmente a través del uso del volumen<br></br>
            </div>
            <div
              className="ButtonBackTattooArtist"
              onClick={() => navigate("/tatuadores")}
            >
              VOLVER
            </div>
          </div>
        </div>
      </div>
      <FooterBlack />
    </div>
  );
};
