import { useEffect, useState } from "react";
import {
  createAppointment,
  getAppointments,
  getTattooArtist,
} from "../../services/apiCalls";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import "./Appointment.css";
import { jwtDecode } from "jwt-decode";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";

export const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [tattooArtists, setTattooArtists] = useState([]);
  const [selectedShift, setSelectedShift] = useState("morning");
  const [selectedTattooArtist, setSelectedTattooArtist] = useState("");
  const [selectedService, setSelectedService] = useState("tattoo");
  const [selectedTattooArtistId, setSelectedTattooArtistId] = useState(2);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selected, setSelected] = useState();
  
  const isLoggedIn = localStorage.getItem("token");
  let decoded = {};

  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("id", decoded.id);
  } else {
    
    navigate("/login");
    
  }
  
  useEffect(() => {
    if (appointments.length === 0) {
      getAppointments()
        .then((response) => {
          setAppointments(response.data.Appointments);
        })
        .catch((error) => {
          console.error("Error fetching tattoos:", error);
        });
    }
  });
  console.log(appointments);

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

  console.log(tattooArtists);


  useEffect(() => setSelectedUserId(decoded.id), [decoded.id]);
  console.log(selectedUserId);

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

  const handleSubmit = () => {
    const body = {
      title: title,
      description: description,
      tattoo_artist: selectedTattooArtistId,
      client: selectedUserId,
      type: selectedService,
      date: selected,
      turn: selectedShift,
    };
    console.log(body);

    if (
      !body.title ||
      !body.description ||
      !body.tattoo_artist ||
      !body.type ||
      !body.date ||
      !body.client ||
      !body.turn
    ) {
      alert("Revisa el formulario, te falta algun dato");
    } else alert("cita creada correctamente");

    createAppointment(body)
      .then((resultado) => {
        console.log(resultado);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => console.log(error));
  };

  let today;
  let year;
  let month;
  let day;

  function getTodayDate() {
    today = new Date();
    year = today.getFullYear();
    month = String(today.getMonth() + 1).padStart(2, "0");
    day = String(today.getDate()).padStart(2, "0");
  }

  getTodayDate();

  const occupiedDates = appointments.map(
    (appointment) => new Date(appointment.date)
  );
  console.log(occupiedDates);

  const disabledDays = {
    before: new Date(1900, 1, 1),
    after: new Date(year + 1, month, day),
    daysOfWeek: [0, 6],
  };

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
            <div className="title">Selecciona una fecha</div>

            <DayPicker
              defaultMonth={new Date(year, month - 1)}
              fromDate={new Date(today)}
              toDate={new Date(year + 1, month, 23)}
              showOutsideDays
              fixedWeeks
              weekStartsOn={1}
              disabled={disabledDays}
              DayPicker
              id="example"
              numberOfMonths={2}
              mode="single"
              required
              selected={selected}
              onSelect={setSelected}

              // footer={footer}
            />
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
