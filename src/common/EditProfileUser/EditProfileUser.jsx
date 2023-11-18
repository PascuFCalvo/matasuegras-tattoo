import { jwtDecode } from "jwt-decode";
import "./EditProfileUser.css";
import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../../services/apiCalls";

import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../../pages/userSlice";

export const EditProfileUser = ({ setVisibility }) => {
  const [users, setUsers] = useState([]);
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
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      setNameToFilter(decoded.user_name);
      dispatch(login(decoded));
      console.log(decoded.user_name);
    }
  }, [dispatch, rdxUserData.credentials]);

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers()
        .then((response) => {
          setUsers(response.data.Users);
        })
        .catch((error) => {
          console.error("Error fetching users artist:", error);
        });
    }
  }, [users]);

  useEffect(() => {
    const filterProfile = () => {
      return users.filter((users) => users.user_name === nameToFilter);
    };

    setProfile(filterProfile());
  }, [nameToFilter, users]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    let body = {
      id: profile[0].id,
      user_name: formData.user_name,
      email: formData.email,
      phone: formData.phone,
    };

    alert(
      "logica para updatear usuario, de momento no me ha dado tiempo a implementarla"
    );
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
