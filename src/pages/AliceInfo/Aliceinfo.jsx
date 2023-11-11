import "./AliceInfo.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { useNavigate } from "react-router-dom";


export const AliceInfo = () => {
   const navigate = useNavigate();
  return (
    <div>
      <div className="backGroundInfo">
        <div className="title"> ALICE BIO</div>
        <div className = "cardTattooArtist">
          <div className="pictureInfoAl"></div>
          <div className="bio">
            <div className="titleBio"></div>
            <div className="textBio">Nací en el año 2000 en Changsha, China. Con once mesecitos mis padres fueron a por mí hasta allí para traerme a España. Me crié en Albacete. Recuerdo que en el colegio era siempre la única de clase que se tomaba en serio la asignatura de plástica y todo lo que tuviera que ver con dibujo, pero no fue hasta los doce años que empecé mi propio cuaderno. Solo dibujaba sirenas del anime Pichi Pichi Pitch, quizá por eso ahora me gusta tanto hacer sirenas. Toda mi vida he querido ser veterinaria, pero me dio el venazo de hacer bachiller de artes y aprender a dibujar mejor, porque por entonces solo sabía copiar dibujos de Pinterest. El primer año conocí a un tatuador de allí, Chino Carretero, que vino a dar una charla a la Escuela de Arte y con él tuve mi primer contacto con el mundo del tattoo, a los 16 años. Desde entonces supe que quería ser tatuadora. Terminé el bachiller y me vine a Valencia a estudiar Bellas Artes. El tattoo seguía presente en mi vida pero tatuaba como mucho un par de veces al mes cosas pequeñas, lo cual era muy frustrante. Cuando iba a tatuarme veía el ambiente de los estudios y me daba mucha envidia porque yo también quería estar ahí. En cuarentena empecé a hacer un montón de diseños grandes para ver si alguien se animaba a tatuárselos, y fue este marzo de 2021 cuando empecé a hacer los diseños que a mi me gustaban. En verano entré en mi primer estudio, La Cruz Tattoo, de mi amigo Chino, en Albacete. Me gustó mucho la experiencia de estar tatuando junto a más artistas, así que cuando volví a Valencia en septiembre para terminar la carrera, conseguí entrar en No Land. Me siento muy afortunada de haber entrado en el estudio que quería, y el ambiente aquí es muy bueno. No se donde estaré en el futuro, pero espero seguir aprendiendo y adquiriendo experiencia como tatuadora.<br></br></div>
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
