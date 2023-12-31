import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./EditAppointment.css";
import { useNavigate } from "react-router-dom";
import { updateAnAppointment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

export const EditAppointment = ({ selected, visibility, setVisibility }) => {
  const navigate = useNavigate();
  const rdxUserData = useSelector(userData);

  const isLoggedIn = rdxUserData.credentials.token;
  const tokendecoded = jwtDecode(isLoggedIn);

  const [formData, setFormData] = useState({
    id: selected.id,
    title: selected.title,
    description: selected.description,
    tattoo_artist: selected.tattoo_artist,
    type: selected.type,
    date: selected.date,
    turn: selected.turn,
  });

  let redirect;

  if (tokendecoded.level === "black_alien") {
    redirect = "/superAdmin";
  } else if (tokendecoded.level === "tattoo") {
    redirect = "/myTattooPanel";
  } else redirect = "/myUserPanel";

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
      tattoo_artist: formData.tattoo_artist,
    };

    updateAnAppointment(body, rdxUserData.credentials.token)
      .then((resultado) => {
        console.log(resultado);
        alert("cita actualizada");

        setTimeout(() => {
          navigate(redirect);
        }, 1000);
      })
      .catch((error) => console.log(error));

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
          maxLength="25"
          type="text"
        />
        <input
          className="input"
          name="description"
          placeholder={selected.description}
          value={formData.description}
          onChange={handleInputChange}
          maxLength="300"
          type="text"
        />
        {/* <select
          className="inputselect"
          name="type"
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
          
        </select> */}
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
