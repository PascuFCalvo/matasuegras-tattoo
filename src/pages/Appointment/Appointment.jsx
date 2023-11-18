import { useEffect, useState } from "react";
import { createAppointment, getTattooArtist } from "../../services/apiCalls";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";

export const Appointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxUserData = useSelector(userData);

  const [tattooArtists, setTattooArtists] = useState([]);
  const [selectedTattooArtist, setSelectedTattooArtist] = useState("");
  const [selectedTattooArtistId, setSelectedTattooArtistId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("morning");
  const [selectedService, setSelectedService] = useState("tattoo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(""); 
 

  
  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      alert("No estás logeado");
      navigate("/login") 
    
      
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      setSelectedUserId(decoded.id);
      console.log(decoded.id);
      dispatch(login(decoded));
    }
  }, [dispatch, rdxUserData.credentials]);

  useEffect(() => {
    const bringTattooArtist = async () => {
      try {
        const response = await getTattooArtist();
        setTattooArtists(response.data.Artists);
      } catch (error) {
        console.error("Error pillando Tatuadores:", error);
      }
    };

    if (tattooArtists.length === 0) {
      bringTattooArtist();
    }
  }, [tattooArtists]);

  useEffect(() => {
    const selectedTattooArtistObject = tattooArtists.find(
      (artist) => artist.user_name === selectedTattooArtist
    );

    if (selectedTattooArtistObject) {
      setSelectedTattooArtistId(selectedTattooArtistObject.id);
    }
  }, [selectedTattooArtist, tattooArtists]);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const selectedDay = new Date(selectedDate).getDay();
    if (selectedDay === 1 || selectedDay === 0) {
      alert("Domingo y Lunes estamos cerrados");
      return;
    }
    setSelectedDate(selectedDate);
  };

  const handleShiftChange = (event) => {
    const selectedShift = event.target.value;
    setSelectedShift(selectedShift);
  };

  const handleTattooArtistChange = (event) => {
    const selectedTattooArtist = event.target.value;
    setSelectedTattooArtist(selectedTattooArtist);
  };

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setSelectedService(selectedService);
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  };

  const formatSelectedDate = () => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    try {
      if (
        !title ||
        !description ||
        !selectedTattooArtistId ||
        !selectedService ||
        !selectedDate ||
        !selectedUserId ||
        !selectedShift
      ) {
        alert("Revisa el formulario, te falta algún dato");
        return;
      }

      const body = {
        "title": title,
        "description": description,
        "tattoo_artist": selectedTattooArtistId,
        "client": selectedUserId,
        "type": selectedService,
        "date": formatSelectedDate(),
        "turn": selectedShift,
      };

      console.log(body);

      await createAppointment(body);

      setTimeout(() => {
        alert("Cita creada correctamente")
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error creating appointment:", error);
      
      alert("Hubo un error al crear la cita. Por favor, inténtalo de nuevo.");
    }
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <div className="Appointment">
        {tattooArtists.length > 0 ? (
          <div className="AppointmentBackground">
            <div className="title">Titulo</div>
            <input
              className="customInput"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
            <div className="title">Descripcion</div>
            <input
              className="customInput"
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <div className="title">Selecciona una fecha</div>
            <input
              className="selectDate"
              type="date"
              id="appointmentDate"
              value={selectedDate}
              onChange={handleDateChange}
              min={getTodayDate()}
            />
            <div className="title">Selecciona un Servicio</div>
            <select
              className="selectService"
              id="selectService"
              value={selectedService}
              onChange={handleServiceChange}
            >
              <option value="tattoo">tattoo</option>
              <option value="piercing">piercing</option>
            </select>
            <div className="title">Selecciona un Turno</div>
            <select
              className="selectShift"
              id="shift"
              value={selectedShift}
              onChange={handleShiftChange}
            >
              <option value="morning">Mañana</option>
              <option value="evening">Tarde</option>
            </select>
            <div className="title">Selecciona un Tatuador</div>
            <select
              className="selectArtist"
              id="selectTattooArtist"
              value={selectedTattooArtist}
              onChange={handleTattooArtistChange}
            >
              {tattooArtists.map((tattooArtist) => (
                <option key={tattooArtist.id} value={tattooArtist.user_name}>
                  {tattooArtist.user_name}
                </option>
              ))}
            </select>
            <div className="buttonSubmitPedirCita" onClick={handleSubmit}>
              Pedir Cita
            </div>
            <div className="blankPedirCita"></div>
          </div>
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>
      <FooterBlack />
    </div>
  );
};
