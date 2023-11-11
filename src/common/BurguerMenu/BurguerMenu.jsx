import { useState } from 'react';
import './BurguerMenu.css';

export const BurguerMenu = () => {
   const [menuOpen, setMenuOpen] = useState(false);
 
   const toggleMenu = () => {
     setMenuOpen(!menuOpen);
   };
 
   const closeMenu = () => {
     setMenuOpen(false);
   };
 
   const opciones = [
     { id: 1, nombre: 'INICIO', onClick: () => alert('Ir a Inicio') },
     { id: 2, nombre: 'ESTUDIO', onClick: () => alert('Ir a Servicios') },
     { id: 3, nombre: 'TATUADORES', onClick: () => alert('Ir a Productos') },
     { id: 4, nombre: 'GALERIA', onClick: () => alert('Ir a Contacto') },
     { id: 5, nombre: 'PEDIR CITA', onClick: () => alert('Ir a Acerca de') },
     { id: 6, nombre: 'CONTACTO', onClick: () => alert('Ir a Acerca de') },
   ];
 
   return (
     <div className="hamburguesa-menu">
       <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
         <div className="bar"></div>
         <div className="bar"></div>
         <div className="bar"></div>
       </div>
 
       <div className={`opciones ${menuOpen ? 'open' : ''}`}>
         {opciones.map((opcion) => (
           <div
             key={opcion.id}
             className="opcion"
             onClick={() => {
               opcion.onClick();
               closeMenu();
             }}
           >
             {opcion.nombre}
           </div>
         ))}
       </div>
     </div>
   );
 };
 