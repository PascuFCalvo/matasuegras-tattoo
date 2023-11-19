import { jwtDecode } from "jwt-decode";
import "./EditProfileTattoo.css";
import { useEffect, useState } from "react";
import { getTattooArtist, updateUser } from "../../services/apiCalls";

import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../../pages/userSlice";
import { Navigate } from "react-router-dom";

export const EditProfileTattoo = ({ setVisibility }) => {
  const [tattooArtist, setTattooArtist] = useState([]);
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const [profile, setProfile] = useState([]);
  const [nameToFilter, setNameToFilter] = useState();

  const [formData, setFormData] = useState({
    user_name: "", 
    email: "",
    phone: "",
    
  });

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      console.log("No estás logeado");
      Navigate("/login");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      setNameToFilter(decoded.user_name);
      dispatch(login(decoded));
    }
  }, [dispatch, rdxUserData.credentials]);

  useEffect(() => {
    if (tattooArtist.length === 0) {
      getTattooArtist()
        .then((response) => {
          setTattooArtist(response.data.Artists);
        })
        .catch((error) => {
          console.error("Error fetching tattoo artist:", error);
        });
    }
  }, [tattooArtist]);

  useEffect(() => {
    const filterProfile = () => {
      return tattooArtist.filter(
        (tattooArtist) => tattooArtist.user_name === nameToFilter
      );
    };

    setProfile(filterProfile()); 
  }, [nameToFilter, tattooArtist]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    let body = {
      user_name: formData.user_name,
      email: formData.email,
      phone: formData.phone,
      id: profile.id, 
    };

    alert("logica para updatear usuario, de momento no me ha dado tiempo a implementarla");
    updateUser(body)
      
      .then((resultado) => {
        console.log(resultado);

        alert("usuario actualizado");

        setTimeout(() => {}, 1000);
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      setVisibility(false);
    }, 2000);
  };

  const handleHideClick = () => {
    setVisibility(false);
  };

  return (
    <>
      <div className="CardEditTattoo">
        <div className="titleEdit">PANEL DE EDICION</div>
        <div className = "overInput">NOMBRE</div>
        <input
          className="input"
          name="user_name"
          placeholder={profile.length > 0 ? profile[0].user_name : ""}
          value={formData.user_name}
          onChange={handleInputChange}
        />
        <div className = "overInput">EMAIL</div>
        <input
          className="input"
          name="email"
          placeholder={profile.length > 0 ? profile[0].email : ""}
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className = "overInput">TELEFONO</div>
        <input
          className="input"
          name="phone"
          placeholder={profile.length > 0 ? profile[0].phone : ""}
          value={formData.phone}
          onChange={handleInputChange}
        />
        
        <div className="botonera">
          <button className="buttonCloseEdit" onClick={handleHideClick}>
            Cerrar
          </button>
          <button className="buttonSaveEdit" onClick={handleSaveClick}>
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};
