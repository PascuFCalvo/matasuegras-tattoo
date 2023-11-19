import { forwardRef, useEffect, useState } from "react";
import { createAppointment, getTattooArtist } from "../../services/apiCalls";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getDay, subDays } from "date-fns";

export const Appointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxUserData = useSelector(userData);

  const [tattooArtists, setTattooArtists] = useState([]);
  const [selectedTattooArtist, setSelectedTattooArtist] = useState("");
  const [selectedTattooArtistId, setSelectedTattooArtistId] = useState("");
  const [startDate, setStartDate] = useState();
  const [selectedShift, setSelectedShift] = useState("morning");
  const [selectedService, setSelectedService] = useState("tattoo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      alert("No estás logeado");
      navigate("/login");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      setSelectedUserId(decoded.id);
      dispatch(login(decoded));
    }
  }, [dispatch, navigate, rdxUserData.credentials]);

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

  const handleDateChange = (date) => {
    // const selectedDay = getDay(date);
    // // if (selectedDay === 0 || selectedDay === 1) {
    // //   alert("Domingo y Lunes estamos cerrados");
    // //   return;
    // // }
    setStartDate(date);
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
    if (!startDate) return "";
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    try {
      if (
        !title ||
        !description ||
        !selectedTattooArtistId ||
        !selectedService ||
        !startDate ||
        !selectedUserId ||
        !selectedShift
      ) {
        alert("Revisa el formulario, te falta algún dato");
        return;
      }

      const body = {
        title,
        description,
        tattoo_artist: selectedTattooArtistId,
        client: selectedUserId,
        type: selectedService,
        date: formatSelectedDate(),
        turn: selectedShift,
      };

      await createAppointment(body, rdxUserData.credentials.token);

      setTimeout(() => {
        alert("Cita creada correctamente");
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Hubo un error al crear la cita. Por favor, inténtalo de nuevo.");
    }
  };

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 1;
  };

  return (
    <div>
      <div className="Appointment">
        {tattooArtists.length > 0 ? (
          <div className="AppointmentBackground">
            <div className="titleAppointment">Titulo</div>
            <input
              className="customInput"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              maxLength="25"
          
            />
            <div className="titleAppointment">Descripcion</div>
            <input
              className="customInput"
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              maxLength="300"
          
            />
            <div className="titleAppointment">Selecciona una fecha</div>
            <DatePicker
              className="prueba"
              selected={startDate}
              onChange={handleDateChange}
              includeDateIntervals={[
                {
                  start: subDays(new Date(), 0),
                  end: addDays(new Date(), 180),
                },
              ]}
              withPortal
              filterDate={isWeekday}
              placeholderText="Click aqui para elegir una fecha"
              customInput={<ExampleCustomInput />}
            />
            <div className="titleAppointment">Selecciona un Servicio</div>
            <select
              className="selectService"
              id="selectService"
              value={selectedService}
              onChange={handleServiceChange}
            >
              <option value="tattoo">tattoo</option>
              <option value="piercing">piercing</option>
            </select>
            <div className="titleAppointment">Selecciona un Turno</div>
            <select
              className="selectShift"
              id="shift"
              value={selectedShift}
              onChange={handleShiftChange}
            >
              <option value="morning">Mañana</option>
              <option value="evening">Tarde</option>
            </select>
            <div className="titleAppointment">Selecciona un Tatuador</div>
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
