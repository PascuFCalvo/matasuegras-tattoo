import "./TattooArtist.css";
import BlackAlien from "../../images/Black-Alien.jpg";
import Alice from "../../images/Alice.jpg";
import DewisConsin from "../../images/Dewis-consin.jpg";
import DonRogelio from "../../images/Don-Rogelio.jpg";
import Sento from "../../images/Sento.jpg";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { useNavigate } from "react-router-dom";

export const TattoArtist = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="backgroundTattooArtist">
        <div className="gridTattooArtist">
          <div className="flexTattoArtist">
            <img
              className="tattooimage"
              src={BlackAlien}
              onClick={() => navigate("/tatuadores/blackAlien")}
            ></img>
            <div>
              Desde que nací, un 1993 en Valencia, he estado dibujando, casi
              como necesidad existencial. Aunque no fue hasta la universidad
              cuando empecé a considerarlo como algo más que un hobby.
            </div>
            <img
              className="tattooimage"
              src={Sento}
              onClick={() => navigate("/tatuadores/sento")}
            ></img>
            <div>
              Rockero de cuna y tatuador por curiosidad, se debate entre el
              sonido de una Les Paul y el zumbido de las máquinas de tatuar. Su
              adicción al punk le lleva a crear su propio sello discográfico,
              Mongolic Records, aunque su verdadero oficio son las pieles.
            </div>
          </div>
          <div className="flexTattoArtist">
            <img
              className="tattooimage"
              src={DewisConsin}
              onClick={() => navigate("/tatuadores/dewisConsin")}
            ></img>
            <div>
              Empece a tatuar por el año 1995 con un amigo que me ayudo a
              conseguir lo justo para empezar a dar mis primeros pasos, y la
              información básica para hacerlo, aprender a soldar agujas solo,
              fue un infierno.
            </div>
            <img
              className="tattooimage"
              src={DonRogelio}
              onClick={() => navigate("/tatuadores/donRogelio")}
            ></img>
            <div>
              DonRogelio es un ilustrador y diseñador nacido en La Habana en el
              87. Empieza a explorar el tattoo como otro soporte de expresión de
              la plástica. Por 2008 había muy poca escena del tattoo en Cuba.
            </div>
          </div>
          <div className="flexTattoArtist">
            <img
              className="tattooimage"
              src={Alice}
              onClick={() => navigate("/tatuadores/alice")}
            ></img>
            <div>
              Nací en el año 2000 en Changsha, China. Con once mesecitos mis
              padres fueron a por mí hasta allí para traerme a España. Me crié
              en Albacete. Recuerdo que en el colegio era siempre la única de
              clase que se tomaba en serio la asignatura de plástica y todo lo
              que tuviera que ver con dibujo.
            </div>
          </div>
        </div>
      </div>
      <FooterBlack />
    </div>
  );
};
