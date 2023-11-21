import { jwtDecode } from "jwt-decode";
import "./EditProfileUser.css";
import { useEffect, useState } from "react";
import { getAllUsers, updateTattoo, updateUser } from "../../services/apiCalls";

import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../../pages/userSlice";
import { Navigate } from "react-router-dom";

export const EditProfileUser = ({ setVisibility }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const [profile, setProfile] = useState([]);
  const [nameToFilter, setNameToFilter] = useState();
  const [decoded, setDecoded] = useState();

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!rdxUserData.credentials.token) {
      Navigate("/login");
    } else {
      const decodedToken = jwtDecode(rdxUserData.credentials.token);
      setDecoded(decodedToken);
      dispatch(login(decodedToken));
      setNameToFilter(decodedToken.user_name);
    }
  }, [dispatch, rdxUserData.credentials]);

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers(rdxUserData.credentials.token)
        .then((response) => {
          setUsers(response.data.Users);
        })
        .catch((error) => {
          console.error("Error fetching users artist:", error);
        });
    }
  }, [users, rdxUserData.credentials.token]);

  useEffect(() => {
    const filterProfile = () => {
      return users.filter((user) => user.user_name === nameToFilter);
    };

    setProfile(filterProfile());
  }, [decoded, nameToFilter, users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    const body = {
      id: decoded.id,
      user_name: formData.user_name,
      email: formData.email,
      phone: formData.phone,
    };

    alert("Se va a actualizar el usuario");

    Promise.all([
      updateTattoo(body, rdxUserData.credentials.token),
      updateUser(body, rdxUserData.credentials.token),
    ])
      .then((results) => {
        console.log(results);

        // Actualizar el token en el estado de Redux si es necesario
        if (results[1].data.newToken) {
          dispatch(login({ token: results[1].data.newToken }));
        }

        alert("Usuario actualizado");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setVisibility(false);
        }, 2000);
      });
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
          maxLength="25"
          type="text"
        />
        <div className="overInput">EMAIL</div>
        <input
          className="input"
          name="email"
          placeholder={profile.length > 0 ? profile[0].email : ""}
          value={formData.email}
          onChange={handleInputChange}
          maxLength="50"
          type="email"
        />
        <div className="overInput">TELEFONO</div>
        <input
          className="input"
          name="phone"
          placeholder={profile.length > 0 ? profile[0].phone : ""}
          value={formData.phone}
          onChange={handleInputChange}
          maxLength="25"
          type="text"
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
