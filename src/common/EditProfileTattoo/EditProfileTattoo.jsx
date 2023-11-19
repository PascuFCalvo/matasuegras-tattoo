import { useNavigate } from "react-router-dom";
import "./EditProfileTattoo.css";
import { getAllUsers, getTattooArtist, updateTattoo, updateUser } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { login, userData } from "../../pages/userSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

export const EditProfileTattoo = ({ setVisibility }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const [profile, setProfile] = useState([]);
  const [artists, setArtists] = useState([]);
  const [nameToFilter, setNameToFilter] = useState();
  const [decoded, setDecoded] = useState();
  const [filteredArtists, setFilteredArtists] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!rdxUserData.credentials.token) {
      console.log("No estás logeado");
      navigate("/myTattooPanel");
    } else {
      const decodedToken = jwtDecode(rdxUserData.credentials.token);
      setDecoded(decodedToken);
      dispatch(login(decodedToken));
      setNameToFilter(decodedToken.user_name);
    }
  }, [dispatch, rdxUserData.credentials, navigate]);

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers(rdxUserData.credentials.token)
        .then((response) => {
          setUsers(response.data.Users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [rdxUserData.credentials.token, users]);

  useEffect(() => {
    if (artists.length === 0) {
      getTattooArtist(rdxUserData.credentials.token)
        .then((response) => {
          setArtists(response.data.Artists);
        })
        .catch((error) => {
          console.error("Error fetching tattoo artists:", error);
        });
    }
  }, [rdxUserData.credentials.token, artists]);

  useEffect(() => {
    const filterTattooArtists = () => {
      const filteredArtists = artists.filter((artist) => artist.user_name === decoded.user_name);
      console.log("Tatuador filtrado:", filteredArtists[0]);
      setFilteredArtists(filteredArtists);
    };

    filterTattooArtists();
  }, [decoded, artists]);

  useEffect(() => {
    const filterProfile = () => {
      return users.filter((user) => user.user_name === nameToFilter);
    };

    setProfile(filterProfile());
  }, [decoded, nameToFilter, users]);

  // Update formData when profile changes
  useEffect(() => {
    setFormData({
      user_name: profile.length > 0 ? profile[0].user_name : "",
      email: profile.length > 0 ? profile[0].email : "",
      phone: profile.length > 0 ? profile[0].phone : "",
    });
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    let body = {
      id: decoded.id,
      user_name: formData.user_name,
      email: formData.email,
      phone: formData.phone,
    };

    let body2 = {
      id: filteredArtists[0].id,
      user_name: formData.user_name,
      email: formData.email,
      phone: formData.phone,
    };

    alert("Se va a actualizar el usuario");
    updateUser(body, rdxUserData.credentials.token)
      .then((resultado) => {
        console.log(resultado);
        alert("Usuario actualizado");
        setTimeout(() => {
          setVisibility(false);
        }, 1000);
      })
      .catch((error) => console.log(error));

    updateTattoo(body2, rdxUserData.credentials.token)
      .then((resultado) => {
        console.log(resultado);
        alert("Tatuador actualizado");
      })
      .catch((error) => console.log(error));
  };

  const handleHideClick = () => {
    setVisibility(false);
  };

  return (
    <>
      <div className="CardEditTattoo">
        <div className="titleEdit">PANEL DE EDICION</div>
        <div className="overInput">NOMBRE</div>
        <input
          className="input"
          name="user_name"
          placeholder={profile.length > 0 ? profile[0].user_name : ""}
          value={formData.user_name}
          onChange={handleInputChange}
        />
        <div className="overInput">EMAIL</div>
        <input
          className="input"
          name="email"
          placeholder={profile.length > 0 ? profile[0].email : ""}
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className="overInput">TELEFONO</div>
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