import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./EditAppointment.css";
import { useNavigate } from "react-router-dom";
import { updateAnAppointment } from "../../services/apiCalls";

export const EditAppointment = ({ selected, visibility, setVisibility }) => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");
  const tokendecoded = jwtDecode(isLoggedIn);
  console.log(tokendecoded);

  const [formData, setFormData] = useState({
    id: selected.id,
    title: selected.title,
    description: selected.description,
    tattoo_artist: selected.tattoo_artist,
    type: selected.type,
    date: selected.date,
    turn: selected.turn,
  });

  const handleHideClick = () => {
    setVisibility(false);
  };

  const handleSaveClick = () => {
    let body = {
      user_id: tokendecoded.id,
      id: selected.id,
      title: formData.title,
      description: formData.description,
      client: tokendecoded.id,
      type: formData.type,
    };
    setTimeout(() => {
      alert("Ahora hay que mandar los datos al backend");
      updateAnAppointment(body)
        .then((resultado) => {
          console.log(resultado);

          setTimeout(() => {
            navigate("/MyUserPanel/UserPanelAppointments");
          }, 1000);
        })
        .catch((error) => console.log(error));
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
        <select
          className="inputselect"
          name="tattoo_artist"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="option1">tattoo</option>
          <option value="option2">piercing</option>
          
        </select>
        <select
          className="inputselect"
          name="tattoo_artist"
          value={formData.tattoo_artist}
          onChange={handleInputChange}
        >
          <option value="option1">Black Alien</option>
          <option value="option2">Sento</option>
          <option value="option3">DonRogelio</option>
          <option value="option4">Dewis Consin</option>
          <option value="option5">alice</option>
        </select>
        <input
          className="input"
          name="date"
          placeholder={selected.date}
          type="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <select
          className="inputselect"
          name="tattoo_artist"
          value={formData.turn}
          onChange={handleInputChange}
        >
          <option value="option1">morning</option>
          <option value="option2">evening</option>
          
        </select>
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