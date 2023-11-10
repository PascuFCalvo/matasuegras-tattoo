import { useEffect, useState } from "react";
import { getTattooArtist } from "../../services/apiCalls";
import { FooterBlack } from "../../common/FooterBlack/FooterBlack";
import "./Appointment.css";


//falta recibir la id del cliente (esta en el token)

export const Appointment = () => {
  const [tattooArtists, setTattooArtists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedShift, setSelectedShift] = useState("morning");
  const [selectedTattooArtist, setSelectedTattooArtist] = useState("");

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

  const formatSelectedDate = () => {
    
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    // Aquí puedes implementar la lógica para enviar la información seleccionada
    // Puedes enviar los valores de selectedDate, selectedShift y selectedTattooArtist a tu servidor, por ejemplo
    const formattedDate = formatSelectedDate();
    console.log("Fecha seleccionada:", formattedDate);
    console.log("Turno seleccionado:", selectedShift);
    console.log("Tatuador seleccionado:", selectedTattooArtist);
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
            <div className="appointmentDate">Seleccione la fecha:</div>
            <input
              type="date"
              id="appointmentDate"
              value={selectedDate}
              onChange={handleDateChange}
              min={getTodayDate()}
            />
            <div className="appointmentDate">Seleccione el turno:</div>
            <select id="shift" value={selectedShift} onChange={handleShiftChange}>
              <option value="morning">Mañana</option>
              <option value="afternoon">Tarde</option>
            </select>
            <div className="appointmentDate">Selecciona el tatuador:</div>
            <select
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
            <button onClick={handleSubmit}>Enviar</button>
          </div>
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>
      <FooterBlack />
    </div>
  );
};
