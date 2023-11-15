import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./EditAppointment.css";
import { useNavigate } from "react-router-dom";

export const EditAppointment = ({ selected, visibility, setVisibility }) => {

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");
  const tokendecoded = jwtDecode(isLoggedIn);

  const [formData, setFormData] = useState({
    id: selected.id,
    title: selected.title,
    description: selected.description,
    tattoo_artist: selected.tattoo_artist,
    date: selected.date,
    turn: selected.turn,
  });

  const handleHideClick = () => {
    setVisibility(false);
  };




  const handleSaveClick = () => {
    
    console.log(formData);
    setTimeout(() => {
      alert("Ahora hay que mandar los datos al backend")
    }, 100);
    setTimeout(() => {
      setVisibility(false);
    }, 2000);
    
  };

  const handleInputChange = (e) => {
  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={`editedCardBody ${visibility ? "visible" : "hidden"}`}>
      <div className="titleEditCitas">PANEL DE EDICION DE CITAS</div>
      <>
        <input
          className="input"
          name="id"
          placeholder={selected.id}
          value={formData.id}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="title"
          placeholder={selected.title}
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="description"
          placeholder={selected.description}
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="tattoo_artist"
          placeholder={selected.tattoo_artist}
          value={formData.tattoo_artist}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="date"
          placeholder={selected.date}
          type="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="turn"
          placeholder={selected.turn}
          value={formData.turn}
          onChange={handleInputChange}
        />
      </>
      <div className="botonera">
        <button className="buttonClose" onClick={handleHideClick}>
          Cerrar
        </button>
        <button className="buttonSave" onClick={handleSaveClick}>
          Guardar
        </button>
      </div>
    </div>
  );
};
