import { useNavigate } from "react-router-dom";
import "./MainUserPanel.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, userData } from "../userSlice";
import { EditProfileUser } from "../../common/EditProfileUser/EditProfileUser";
import { getAllUsers} from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";

export const MainUserPanel = () => {
  const destination = "UserPanelAppointments";
  const [isEditPanelModalVisible, setIsEditPanelModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const [profile, setProfile] = useState([]);
  const [nameToFilter, setNameToFilter] = useState();

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      console.log("No estás logeado");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      setNameToFilter(decoded.user_name);
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
          console.error("Error fetching tattoo artist:", error);
        });
    }
  }, [users]);

  useEffect(() => {
    const filterProfile = () => {
      return users.filter(
        (users) => users.user_name === nameToFilter
      );
    };

    setProfile(filterProfile());
  }, [nameToFilter, users]);


  const handleClickOnEdit = () => {
    setIsEditPanelModalVisible(true);
  };

  

  return (
    <>
      <div className="BackgroundMainSuperAdmin">
      <div className="headerAdminPanel"></div>
        {isEditPanelModalVisible && 
        <EditProfileUser setVisibility={setIsEditPanelModalVisible} />}
        <div className="titleAdmin">PANEL DE USUARIO</div>
        <div className="infoTatuador">NOMBRE: {profile.length > 0 ? profile[0].user_name : ""}</div>
        <div className="infoTatuador">EMAIL: {profile.length > 0 ? profile[0].email : ""}</div>
        <div className="infoTatuador">{profile.length > 0 ? profile[0].phone : ""}</div>
        <div className="buttonEditArtist" onClick={handleClickOnEdit}>EDIT</div>
        <div className="buttons">
          <div className="buttonUsers" onClick={() => navigate(destination)}>
            {" "}
            Ver Citas{" "}
          </div>
        </div>
      </div>
      <FooterBlack />
    </>
  );
};
