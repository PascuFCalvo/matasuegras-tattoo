import "./MainEstudio.css";
import elEstudio1 from "../../images/elEstudio1.jpg"
import elEstudio2 from "../../images/elEstudio2.jpg"
import elEstudio3 from "../../images/elEstudio3.jpg"
import elEstudio4 from "../../images/elEstudio4.jpg"
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";


export const MainEstudio = () => {
  return (
   <div><div className="backgroundElEstudio">
      <div className = "textoEstudio">
         <div className = "tituloTexto">
         NUESTRO ESTUDIO DE TATUAJE Y PIERCING EN VALENCIA<br/>
         </div>
         <div className = "parrafoTexto">
         Matasuegras es un concepto único como estudio de tatuaje y piercing en Valencia. Hemos empezado nuestra andadura en Abril de 2016, y hemos venido para marcar un antes y un después en la ciudad de Valencia.
         <br></br>
         <br></br>


         Al frente del proyecto tenemos a Sento, un tatuador veterano que empezó hace más de 20 años a tatuar. Tras muchos años de experiencia, absorbiendo conocimientos en estudios de todo el mundo, muchas convenciones y mucha práctica, decidió poner en marcha un proyecto muy ambicioso y con el que poder satisfacer una de sus grandes inquietudes, juntar a los mejores tatuadores nacionales e internacionales bajo un mismo techo. Y con una filosofía dónde la amistad, el respeto y la pasión por el tatuaje, son valores fundamentales.
         <br/>
         <br/>

         Un estudio de tattoo destinado a convertirse en referente a nivel nacional e internacional, hecho con mucho mimo, tanto por su diseño como por sus valores.
         <br/>
         <br/>
         Cuidando absolutamente hasta el más mínimo detalle, nuestro estudio de tatuaje en Valencia nos sitúa entre estética Victoriana del siglo XIX y una película de David Lynch, con algún guiño a Twin Peaks.
         <br/>
         <br/>
         </div>
      </div>

      <img src ={elEstudio1}></img>
      <div className = "flexfotos">
      <img src ={elEstudio2}></img>
      <img src ={elEstudio3}></img>
      </div>
      <img className = "final" src ={elEstudio4}></img>
      <div className="App">
      <div className = "tituloTexto">MAKING OF DEL ESTUDIO</div>
      <YoutubeEmbed embedId="Qd8lEeGW3-A" />
    </div>
    </div>
    
    
      </div>
    
      
  );
};
