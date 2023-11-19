import { jwtDecode } from "jwt-decode";
import "./EditProfileSuperAdmin.css";
import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../../services/apiCalls";

import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";

export const EditProfileSuperAdmin = ({
  setVisibility,
  idToEdit,
  nameToEdit,
}) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      navigate("/login");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);

      dispatch(login(decoded));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    let body = {
      id: idToEdit,
      user_name: formData.user_name,
      email: formData.email,
      phone: formData.phone,
    };

    updateUser(body)
      .then((resultado) => {
        console.log(resultado);
        alert("Usuario actualizado");
        navigate("/superAdmin/superAdminUsers");
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
          placeholder={nameToEdit}
          value={formData.user_name}
          onChange={handleInputChange}
          maxLength="25"
          type="text"
        />
        <div className="overInput">EMAIL</div>
        <input
          className="input"
          name="email"
          placeholder=""
          value={formData.email}
          onChange={handleInputChange}
          maxLength="100"
          type="email"
        />
        <div className="overInput">TELEFONO</div>
        <input
          className="input"
          name="phone"
          placeholder=""
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
