import { useEffect, useState, useRef } from "react";
import "./SuperAdmin.css";
import { deleteAUser, getAllUsers } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const SuperAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messagePosition, setMessagePosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef([]);

  const deleteUser = (id, index) => {
    let body = { id: id };
    console.log(body);

    const buttonRect = buttonRefs.current[index].getBoundingClientRect();

    deleteAUser(body)
      .then((resultado) => {
        console.log(resultado);

        // Actualizar el estado local después de la eliminación exitosa
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

        setMessagePosition({
          top: buttonRect.top + window.scrollY,
          left: buttonRect.right + window.scrollX + 50,
        });

        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      })
      .catch((error) => console.log(error));
  };

  const navigate = useNavigate();

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

  return (
    <div>
      <div className="ListUsers">
        <div className="panelAdminTitle">LISTADO DE USUARIOS</div>
        {users.length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {users.map((user, index) => (
                <div className="userRow" key={user.id}>
                  <div className="id">{user.id}</div>
                  <div className="userName">{user.user_name}</div>
                  <div className="email">{user.email}</div>
                  <div className="phone">{user.phone}</div>
                  <div className="level">{user.level}</div>
                  <div className="created_at">{user.created_at}</div>
                  <div className="updated_at">{user.updated_at}</div>
                  <div className="buttonEdit"> Edit</div>
                  <div
                    className="buttonDelete"
                    onClick={() => deleteUser(user.id, index)}
                    ref={(ref) => (buttonRefs.current[index] = ref)}
                  >
                    X
                  </div>
                </div>
              ))}
            </div>
            <div className="buttonBack" onClick={() => navigate("/superAdmin")}>
              Volver al panel
            </div>
          </>
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>

      {showMessage && (
        <div
          className={`popupMessage ${showMessage ? "show" : ""}`}
          style={{
            top: `${messagePosition.top}px`,
            left: `${messagePosition.left}px`,
          }}
        >
          Usuario eliminado
        </div>
      )}
    </div>
  );
};
