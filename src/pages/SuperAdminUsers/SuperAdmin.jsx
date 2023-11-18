import { useEffect, useState } from "react";
import "./SuperAdmin.css";
import { deleteAUser, getAllUsers } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { EditProfileSuperAdmin } from "../../common/EditProfileSuperAdmin/EditProfileSuperAdmin";

export const SuperAdminUsers = () => {
  const [isEditPanelModalVisible, setIsEditPanelModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const [idToEdit, setIdToEdit] = useState();
  const [nameToSend , setNameToSend] = useState()

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      console.log("No estás logeado");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      dispatch(login(decoded));
    }
  }, [dispatch, rdxUserData.credentials]);

  const navigate = useNavigate();

  const deleteUser = (id) => {
    deleteAUser(id).then((resultado) => {
      console.log(resultado);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    });
  };

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers()
        .then((response) => {
          setUsers(response.data.Users);
        })
        .catch((error) => {
          console.error("Error fetching tattoos:", error);
        });
    }
  }, [users]);
  
  
  const handleEditUser = (id, user_name) => { 
    console.log(id)
    console.log(user_name)
    setIdToEdit(id);
    setNameToSend(user_name) 
    setIsEditPanelModalVisible(true);
  };

  
  return (
    <div>
      <div className="ListUsers">
        <div className="panelAdminTitle">LISTADO DE USUARIOS</div>
        <>
          {isEditPanelModalVisible && (
            <EditProfileSuperAdmin
              setVisibility={setIsEditPanelModalVisible}
              idToEdit={idToEdit}
              nameToEdit = {nameToSend}
            />
          )}
        </>
        {users.length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {users.map((user, index) => (
                <div className="completeRow" key={user.id}>
                  <div className="userRow">
                    <div className="id">{user.id}</div>
                    <div className="userName">{user.user_name}</div>
                    <div className="email">{user.email}</div>
                    <div className="phone">{user.phone}</div>
                    <div className="level">{user.level}</div>
                    <div className="created_at">{user.created_at}</div>
                    <div className="updated_at">{user.updated_at}</div>
                  </div>
                  <div className="buttonsSuperAdmin">
                    <div
                      className="buttonEdit"
                      onClick={() => handleEditUser(user.id)}
                    >
                      
                      Edit
                    </div>
                    <div
                      className="buttonDelete"
                      onClick={() => deleteUser(user.id, index)}
                    >
                      X
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="buttonBack"
              onClick={() => navigate("/superAdmin")}
            >
              Volver al panel
            </div>
          </>
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>
    </div>
  );
};
