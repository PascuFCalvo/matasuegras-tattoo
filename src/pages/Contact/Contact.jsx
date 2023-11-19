import "./Contact.css";

import { FooterBlack } from "../../common/FooterBlack/FooterBlack";

export const Contact = () => {
  return (
    <div className="backgroundContact">
      <div className="blockColumns">
        <div className="columnaIzquierda">
          <div className="titleContact">
            VEN A VERNOS A NUESTRO ESTUDIO, ESTAMOS DESEANDO CONOCERTE
          </div>
          <div className="textContact">
            <span className="negrita">Dirección:</span> Gran Vía Fernando el
            Masonico 99, 46666 València<br></br>
            <span className="negrita">Teléfono: 960 07 69 24</span>
            <br></br>
            WhatsApp: 679 329 519<br></br>
            <span className="negrita">Horario</span>: De Martes a Sábado de{" "}
            <span className="negrita">11:00–14:00 y de 16:30–20:30</span>
          </div>

          <div className="googleMap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.7821087224706!2d-0.38127211114498555!3d39.4742509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4d7bb82999%3A0x47a5da1f8817c23f!2sADEIT%20-%20Fundaci%C3%B3n%20Universidad-Empresa!5e0!3m2!1ses!2ses!4v1699693782796!5m2!1ses!2ses"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="columnaDerecha">
          <div className="titleContact">
            PONTE EN CONTACTO CON NOSOTROS PARA CUALQUIER DUDA O INFORMACIÓN QUE
            NECESITES
          </div>

          <div className="textContact">
            Si tienes cualquier duda acerca de tatuajes, si quieres saber si
            vamos a traer a algún tatuador/a, si quieres pedir cita con
            cualquier tatuador/a, o simplemente quieres saludarnos, rellena este
            formulario y contactaremos contigo en breve.
          </div>

          <form
            className="FormularioContacto"
            action="https://formsubmit.co/Pascual.fernandez.calvo@gmail.com"
            method="POST"
          >
            <div className="Campo">*NOMBRE (REQUERIDO)</div>
            <input
              type="text"
              name="name"
              required
              className="inputContacto"
              maxLength="25"
          
            ></input>
            <div className="Campo">*TU CORREO ELECTRÓNICO (REQUERIDO)</div>
            <input
              type="email"
              name="email"
              required
              className="inputContacto"
              maxLength="50"
            ></input>
            <div className="Campo">ASUNTO</div>
            <input
              type="text"
              name="asunto"
              required
              className="inputContacto"
              maxLength="50"
            ></input>
            <div className="Campo">
              *DESCRIBE TU TATUAJE: (REQUERIDO) MOTIVO , MEDIDA Y ZONA.
            </div>
            <textarea
              type="text"
              name="descripciongit"
              required
              className="inputContacto"
              id="asunto"
              maxLength="500"
            ></textarea>

            <div className="Campo">
              ¡¡IMPORTANTE !!: Revisa tu bandeja de correo no deseado si no
              obtienes respuesta en 24 horas.
            </div>

            <button className="buttonSend" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>

      <FooterBlack />
    </div>
  );
};
