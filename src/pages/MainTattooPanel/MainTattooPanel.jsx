import { useNavigate } from "react-router-dom";
import "./MainTattooPanel.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { getTattooArtist } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { EditProfileTattoo } from "../../common/EditProfileTattoo/EditProfileTattoo";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";

export const MainTattooPanel = () => {
  const [isEditPanelModalVisible, setIsEditPanelModalVisible] = useState(false);
  const [tattooArtist, setTattooArtist] = useState([]);
 
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

  console.log(profile);

  const handleClickOnEdit = () => {
    setIsEditPanelModalVisible(true);
  };

  return (
    <>
      <div className="BackgroundMainSuperAdmin">
        <div className="headerAdminPanel"></div>
        {isEditPanelModalVisible && 
        <EditProfileTattoo setVisibility={setIsEditPanelModalVisible} />}
        <div className="titleAdmin">PANEL DE TATUADOR</div>
        <div className="infoTatuador">NOMBRE: {profile.length > 0 ? profile[0].user_name : ""}</div>
        <div className="infoTatuador">EMAIL:  {profile.length > 0 ? profile[0].email : ""}</div>
        <div className="infoTatuador">PHONE:  {profile.length > 0 ? profile[0].phone : ""}</div>
        <div className="infoTatuador">LICENCIA:  {profile.length > 0 ? profile[0].licenseNumber : ""}</div>
        <div className="infoTatuador">FORMACION: {profile.length > 0 ? profile[0].formation : ""}</div>
        <div className="buttonEditArtist" onClick={handleClickOnEdit}>
          EDIT
        </div>
        <div className="buttons">
          <div
            className="buttonUsers"
            onClick={() => navigate("/myTattooPanel/tattooArtistAppointments")}
          >
            Ver Citas
          </div>
        </div>
      </div>
      <FooterBlack />
    </>
  );
};
