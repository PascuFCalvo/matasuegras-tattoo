import "./DonRogelioInfo.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { useNavigate } from "react-router-dom";


export const DonRogelioInfo = () => {
   const navigate = useNavigate();
  return (
    <div>
      <div className="backGroundInfo">
        <div className="title"> DONROGELIO BIO</div>
        <div className = "cardTattooArtist">
          <div className="pictureInfoDR"></div>
          <div className="bio">
            <div className="titleBio"></div>
            <div className="textBio">Nacido en Benimaclet (Valencia) en el 1985. La primera vez que entré en un estudio de tattoo supe que ése era mi sitio y no una oficina, un despacho o un aula.

Como buen nerd el dibujo es mi ritual diario desde siempre. Pasé por muchos trabajos hasta que compré mis primeras máquinas allá por 2011 y desde entonces no he parado de tatuar de forma independiente.</div>
         <div className = "ButtonBackTattooArtist" onClick={() => 
          navigate("/tatuadores")
          }>VOLVER</div>
          </div>
        </div>
      </div>
      <FooterBlack />
    </div>
  );
};
