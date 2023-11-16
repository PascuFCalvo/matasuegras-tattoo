
import { jwtDecode } from "jwt-decode";
import "./EditProfileTattoo.css";
import { useEffect, useState } from "react";
import { getTattooArtist, updateUser } from "../../services/apiCalls";


export const EditProfileTattoo = ({setVisibility}) => {

  const [tattooArtist, setTattooArtist] = useState([])

  
  const isLoggedIn = localStorage.getItem("token");
  const tokendecoded = jwtDecode(isLoggedIn);
  console.log(tokendecoded);

  const [formData, setFormData] = useState({
    user_name:tokendecoded.user_name,
    email:tokendecoded.email,
    phone:tokendecoded.phone
  });


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
  

  let Profile = {};
  tattooArtist.forEach((element) => {
    if (element.user_name === tokendecoded.user_name) {
      Profile = element;
    }
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    let body = {
      user_name:formData.name,
      email:formData.email,
      phone:formData.phone,
      id:tokendecoded.id
    };
      updateUser(body)
      .then((resultado) => {
          alert("logica para updatear usuario")
          console.log(resultado);
          
          alert ("usuario actualizado")
          
          setTimeout(() => {
          
          }, 1000);
          
          
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
        <div className="titleEdit">EDICION DE USUARIOS</div>
        <input
          className="input"
          name="name"
          placeholder={Profile.user_name}
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="email"
          placeholder={Profile.email}
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="phone"
          placeholder={Profile.phone}
          value={formData.phone}
          onChange={handleInputChange}
        />
        <div className="botonera">
          <button className="buttonClose" onClick={handleHideClick}>
            Cerrar
          </button>
          <button className="buttonSave" onClick={handleSaveClick}>
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};
