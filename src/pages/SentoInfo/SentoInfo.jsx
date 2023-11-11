import "./SentoInfo.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { useNavigate } from "react-router-dom";


export const SentoInfo = () => {
   const navigate = useNavigate();
  return (
    <div>
      <div className="backGroundInfo">
        <div className="title"> SENTO BIO</div>
        <div className = "cardTattooArtist">
          <div className="pictureInfoSe"></div>
          <div className="bio">
            <div className="titleBio"></div>
            <div className="textBio">Rockero de cuna y tatuador por curiosidad, se debate entre el sonido de una Les Paul y el zumbido de las máquinas de tatuar. Su adicción al punk le lleva a crear su propio sello discográfico, Mongolic Records, aunque su verdadero oficio son las pieles.<br></br>

 

Embajador de la vieja escuela, empezó a coquetear con la tinta a los veintitrés años. Aprendió en solitario y se curtió en un par de estudios, pero fue tras recorrerse medio mundo cuando comenzó a forjarse su actual reputación, que le ha llevado a trabajar en estudios como Frith street tattoo (Londres,Inglaterra) , Chapel tattoo (Melobourne, Australia), Tattoo Paradise dc (Washington DC), Aka (Berlin, Alemania), Aloha Tattoos Barcelona (Barcelona, España) o Veneno Tattoo (Madrid, España)<br></br>

 

En 2005 plantó bandera en Valencia, la ciudad que le ha visto crecer como profesional. Después de Puros Tatuajes y de Thee Pirate Studio se le mete entre ceja y ceja un nuevo desafío, ambicioso pero madurado a conciencia: montar uno de los mejores estudios de la capital.<br></br>

 

Así nace No Land Tattoo Parlour, un espacio polivalente, tan formal como canalla, que reúne todos los estilos bajo un mismo techo, bajo una misma premisa: la máxima calidad siempre. Con Sento a la cabeza no podía ser de otra forma.<br></br></div>
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
