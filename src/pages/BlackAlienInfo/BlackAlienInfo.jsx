import "./BlackAlienInfo.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { useNavigate } from "react-router-dom";


export const BlackAlienInfo = () => {
   const navigate = useNavigate();
  return (
    <div>
      <div className="backGroundInfo">
        <div className="title"> BLACK ALIEN BIO</div>
        <div className = "cardTattooArtist">
          <div className="pictureInfoBA"></div>
          <div className="bio">
            <div className="titleBio"></div>
            <div className="textBio">Desde que nací, un 1993 en Valencia, he estado dibujando, casi como necesidad existencial. Aunque no fue hasta la universidad cuando empecé a considerarlo como algo más que un hobby. Fueron mis profesores quienes me persuadieron de matricularme en Bellas Artes y enfocar mi vida totalmente al plano artístico.<br></br>

Aunque yo, en realidad, quería vivir de mi arte ( pinturas, dibujos, esculturas…)algo muy difícil a día de hoy…fueron unos buenos amigos y grandes tatuadores, quienes me metieron la idea de tatuar en la cabeza.<br></br>

Así fue como comencé a tontear con el mundo del tatuaje, hace ya 5 años…<br></br>

Ese verano, en 2017, entré como aprendiz en un estudio en San Antonio, Ibiza. Después de eso tuve un par de malas experiencias laborales en el mundo del tatuaje que me hicieron querer retirarme a trabajar por mi cuenta junto a otros amigos y tatuadores con quienes compartí, viajé y me nutrí de experiencias que han hecho que poco a poco fuese encontrando mi propio estilo.<br></br>

Ahora, por fin, en No Land Tattoo Parlour, me han abierto sus puertas y aquí he encontrado un maravilloso equipo de grandes profesionales y mejores personas junto a los que seguir creciendo y desarrollándome.<br></br>

Muchísimas Gracias por todo, Sento!<br></br></div>
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
