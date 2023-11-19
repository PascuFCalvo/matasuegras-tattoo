import "./StylesSection.css";
import tradicional from "../../assets/tradi_nuevo.png";
import neotradicional from "../../assets/neotradicional.png";
import newschool from "../../assets/new-school.png";
import realismo from "../../assets/realismo_nuevo.png";
import blackwork from "../../assets/black_work.png";
import dotwork from "../../assets/dotwork.png";
import japones from "../../assets/iconojapones.png";
import biomec from "../../assets/biomec-nuevo.png";

export const StylesSection = () => {
  return (
    <>
      <div className="tituloEstilos">
        TATUAJE EN VALENCIA TODOS LOS ESTILOS DE TATUAJE EN EL MISMO ESTUDIO
        <br />
      </div>
      <div className="stylesSection">
        <div className="styleSection">
          <div className="cardStyle">
            <div className="cardStyleImage">
              <img src={tradicional}></img>
            </div>
            <div className="cardStyleTitle"> TRADICIONAL</div>
            <div className="cardStyleDesc">
              Tatuaje de líneas gruesas, colores vivos pero simples, basados en
              diseños icónicos o náuticos como corazones, anclas, etc…
            </div>
          </div>
        </div>
        <div className="styleSection">
          <div className="cardStyle">
            <div className="cardStyleImage">
              <img src={neotradicional}></img>
            </div>
            <div className="cardStyleTitle"> NEOTRADICIONAL</div>
            <div className="cardStyleDesc">
              Elementos del Tradicional con más detalles y más color, el
              resultado son tatuajes mucho mas ‘elaborados’
            </div>
          </div>
        </div>
        <div className="styleSection">
          <div className="cardStyle">
            <div className="cardStyleImage">
              <img src={newschool}></img>
            </div>
            <div className="cardStyleTitle"> NEWSCHOOL</div>
            <div className="cardStyleDesc">
              Imagines tipo ‘cartoon’, combinando tonos brillantes y lineas
              gruesas para crear tatuajes divertidos pero sólidos
            </div>
          </div>
        </div>
        <div className="styleSection">
          <div className="cardStyle">
            <div className="cardStyleImage">
              <img src={realismo}></img>
            </div>
            <div className="cardStyleTitle"> REALISMO</div>
            <div className="cardStyleDesc">
              Tatuajes que imitan el efecto de la fotografia, creando piezas que
              son impresionantes e impactantes a la vista. Suelen ser retratos u
              objetos
            </div>
          </div>
        </div>
        <div className="styleSection">
          <div className="cardStyle">
            <div className="cardStyleImage">
              <img src={blackwork}></img>
            </div>
            <div className="cardStyleTitle"> BLACKWORK</div>
            <div className="cardStyleDesc">
              Realizados solo con tinta negra, enfocado en el potencial del
              negro para crear tatuajes sólidos y elegantes
            </div>
          </div>
        </div>
        <div className="styleSection">
          <div className="cardStyle">
            <div className="cardStyleImage">
              <img src={dotwork}></img>
            </div>
            <div className="cardStyleTitle"> DOTWORK</div>
            <div className="cardStyleDesc">
              Combinan lineas intricadas con puntos para crear diseños complejos
              y delicados como las mandalas. Basados en patrones y en geometría
              sagrada
            </div>
          </div>
        </div>
        <div className="styleSection">
          <div className="cardStyle">
            <div className="cardStyleImage">
              <img src={japones}></img>
            </div>
            <div className="cardStyleTitle"> BIOMECANICO</div>
            <div className="cardStyleDesc">
              Mezcla elementos mecánicos con formas orgánicas para crear
              tatuajes futuristas que se adaptan al cuerpo. Híbrido entre humano
              y máquina
            </div>
          </div>
        </div>
        <div className="styleSection">
          <div className="cardStyle">
            <div className="cardStyleImage">
              <img src={biomec}></img>
            </div>
            <div className="cardStyleTitle"> ORIENTAL</div>
            <div className="cardStyleDesc">
              Imágenes inspiradas de la mitología y arte Chino y Japonés, como
              dragones, geishas, flores autóctonas o carpas. Piezas grandes que
              fluyen con el cuerpo
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
