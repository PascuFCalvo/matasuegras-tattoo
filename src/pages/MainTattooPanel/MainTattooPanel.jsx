import { useNavigate } from "react-router-dom";
import "./MainTattooPanel.css";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import { jwtDecode } from "jwt-decode";
import { getTattooArtist } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { EditProfileTattoo } from "../../common/EditProfileTattoo/EditProfileTattoo";

export const MainTattooPanel = () => {
  const [isEditPanelModalVisible, setIsEditPanelModalVisible] = useState(false);

  const isLoggedIn = localStorage.getItem('token');
  let decoded = {};
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  },);


  const navigate = useNavigate();

  const destination2 = "tattooArtistAppointments";

  const [tattooArtist, setTattooArtist] = useState([]);

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
  console.log(tattooArtist);

  let Profile = {};
  tattooArtist.forEach((element) => {
    if (element.user_name === decoded.user_name) {
      Profile = element;
    }
  });

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
        <div className="infoTatuador">NOMBRE: {Profile.user_name} </div>
        <div className="infoTatuador">EMAIL: {Profile.email} </div>
        <div className="infoTatuador">PHONE: {Profile.phone} </div>
        <div className="infoTatuador">LICENCIA: {Profile.licenseNumber} </div>
        <div className="infoTatuador">FORMACION: {Profile.formation} </div>
        <div className="buttonEditArtist" onClick={handleClickOnEdit}>
          EDIT
        </div>
        <div className="buttons">
          <div
            className="buttonUsers"
            onClick={() => navigate(destination2)}
          >
            Ver Citas
          </div>
        </div>
      </div>
      <FooterBlack />
    </>
  );
};
