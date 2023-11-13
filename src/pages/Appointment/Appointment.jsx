import { useEffect, useState } from "react";
import { createAppointment, getTattooArtist } from "../../services/apiCalls";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import "./Appointment.css";
import { Navigate } from "react-router-dom"; // Cambiado de Navigate a navigate

export const Appointment = () => {
  const [tattooArtists, setTattooArtists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedShift, setSelectedShift] = useState("morning");
  const [selectedTattooArtist, setSelectedTattooArtist] = useState("");
  const [selectedService, setSelectedService] = useState("tattoo");
  const [selectedTattooArtistId, setSelectedTattooArtistId] = useState(2);
  const [selectedUserId, setSelectedUserId] = useState(20);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTattooArtist();
        setTattooArtists(response.data.Artists);
      } catch (error) {
        console.error("Error fetching tattoo artists:", error);
      }
    };

    if (tattooArtists.length === 0) {
      fetchData();
    }
  }, [tattooArtists]);

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

    const selectedTattooArtistObject = tattooArtists.find(
      (artist) => artist.user_name === selectedTattooArtist
    );
      
    if (selectedTattooArtistObject) {
      setSelectedTattooArtistId(selectedTattooArtistObject.id);
    }
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

  const handleSubmit = () => {
    const body = {
      title: title,
      description: description,
      tattoo_artist: selectedTattooArtistId,
      client: selectedUserId,
      type: selectedService,
      date: formatSelectedDate(),
      turn: selectedShift,
    };
    console.log(body);

    alert("cita creada correctamente")

    createAppointment(body)
      .then((resultado) => {
        console.log(resultado);
        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      })
      .catch((error) => console.log(error));
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
              <option value="tattoo">Tattoo</option>
              <option value="piercing">Piercing</option>
            </select>
            <div className="title">Selecciona un Turno</div>
            <select
              className="selectShift"
              id="shift"
              value={selectedShift}
              onChange={handleShiftChange}
            >
              <option value="morning">Mañana</option>
              <option value="afternoon">Tarde</option>
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


