
import "./StoreInfo.css";


export const StoreInfo = () => {
   
   
   return (
      <div className = "generalInfo">
         <div className = "directionInfo">
            <div className = "titleinfo">DIRECCION</div>
            <div className="info">Gran Via Fernando el Masonico 99</div>
            <div className="info">46666 VALENCIA</div>
         </div>
         <div className = "phoneInfo">
            <div className="titleinfo">LLÁMANOS</div>
            <div className="info">Para solicitar cita</div>
            <div className="info">666 666 666</div>
         </div>
         <div className="horarioInfo">
            <div className="titleinfo">HORARIO</div>
            <div className="info">de martes a sabado</div>
            <div className="info">11:00 - 14:00  |  16:30 - 20:30</div>
         </div>
         
            
      </div>
   )

}