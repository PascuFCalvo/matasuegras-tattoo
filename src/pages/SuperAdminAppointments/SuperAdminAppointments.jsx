import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointments, deleteAnAppointment } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { AppointmentDetail } from "../../common/AppointmentDetail/AppointmentDetail";
import { EditAppointment } from "../../common/EditAppointment/EditAppointment";
import "./SuperAdminAppointments.css";

export const SuperAdminAppointments = () => {
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const [appointments, setAppointments] = useState([]);
  const [originalAppointments, setOriginalAppointments] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!rdxUserData.credentials || !rdxUserData.credentials.token) {
      navigate("/login");
    } else {
      const decoded = jwtDecode(rdxUserData.credentials.token);
      dispatch(login(decoded));
    }
  }, [dispatch, rdxUserData.credentials]);

  useEffect(() => {
    if (appointments.length === 0) {
      getAppointments(rdxUserData.credentials.token)
        .then((response) => {
          setAppointments(response.data.myAppointments);
          setOriginalAppointments(response.data.myAppointments); // Guarda una copia original
        })
        .catch((error) => {
          console.error("Error fetching tattoos:", error);
        });
    }
  }, [appointments, rdxUserData.credentials.token]);

  useEffect(() => {
    filtrar(busqueda, originalAppointments); // Filtra la lista original
  }, [busqueda, originalAppointments]);

  const handleAppointmentClick = (appointment) => {
    const appointmentDetails = {
      id: appointment.id,
      title: appointment.title,
      description: appointment.description,
      tattoo_artist: appointment.tattoArtistAppointment.user_name,
      client: appointment.userAppointment.user_name,
      date: appointment.appointment_date,
      type: appointment.type,
      turn: appointment.appointment_turn,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    };
    setIsModalVisible(true);
    setSelectedAppointment(appointmentDetails);
  };

  const handleDetailVisibilityChange = (state) => {
    setIsModalVisible(state);
  };

  const handleEditDetailVisibilityChange = (state) => {
    setIsEditModalVisible(state);
  };

  const handleEditAppointmentClick = (appointment) => {
    const appointmentDetails = {
      id: appointment.id,
      title: appointment.title,
      description: appointment.description,
      trabajo: appointment.type,
      tattoo_artist: appointment.tattoArtistAppointment.user_name,
      client: appointment.userAppointment.user_name,
      date: appointment.appointment_date,
      turn: appointment.appointment_turn,
    };

    setIsEditModalVisible(true);
    setSelectedAppointment(appointmentDetails);
  };

  const handleDeleteAppointmentClick = (appointment) => {
    let body = { id: appointment.id };
    console.log(body);
    alert(`vamos a borrar la id ${appointment.id}`);
    deleteAnAppointment(body, rdxUserData.credentials.token)
      .then((response) => {
        console.log(response);
        alert(`cita eliminada`);
        setTimeout(() => {
          navigate("/superAdmin");
        }, 500);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  const handlechange = (e) => {
    const terminoBusqueda = e.target.value.toLowerCase();
    setBusqueda(terminoBusqueda);
    filtrar(terminoBusqueda, originalAppointments); // Filtra la lista original
  };

  const filtrar = (terminoBusqueda, lista) => {
    if (!terminoBusqueda) {
      setAppointments(lista);
      return;
    }

    const resultadosBusqueda = lista.filter((elemento) => {
      return (
        elemento.title.toLowerCase().includes(terminoBusqueda) ||
        elemento.description.toLowerCase().includes(terminoBusqueda)
      );
    });

    setAppointments(resultadosBusqueda);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div key={i} onClick={() => setCurrentPage(i)}>
          {i}
        </div>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <AppointmentDetail
        selected={selectedAppointment}
        visibility={isModalVisible}
        setVisibility={handleDetailVisibilityChange}
      />

      <EditAppointment
        selected={selectedAppointment}
        visibility={isEditModalVisible}
        setVisibility={handleEditDetailVisibilityChange}
      />

      <div className="ListUsers">
        <div className="panelAdminTitle">LISTADO DE CITAS</div>
        <div className="containerInput">
          <input
            className="inputBuscar"
            value={busqueda}
            placeholder="busca por nombre o descripcion"
            onChange={handlechange}
          />
          <button className="buttonBuscar">Buscar</button>
        </div>
        {currentAppointments.length > 0 ? (
          <>
            <div className="User">
              <div className="UserInfo"></div>
              {currentAppointments.map((appointment) => (
                <div className="completeRow" key={appointment.id}>
                  <div
                    className="userRow"
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <>
                      <div className="id">{appointment.id}</div>
                      <div className="userName">{appointment.title}</div>
                      <div className="email">{appointment.description}</div>
                      <div className="phone">
                        {appointment.userAppointment.user_name}
                      </div>
                      <div className="level">
                        {appointment.tattoArtistAppointment.user_name}
                      </div>
                    </>
                  </div>
                  <div className="deleteButtons">
                    <div
                      className="buttonEdit"
                      onClick={() => handleEditAppointmentClick(appointment)}
                    >
                      Edit
                    </div>
                    <div
                      className="buttonDelete"
                      onClick={() => handleDeleteAppointmentClick(appointment)}
                    >
                      X
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">{renderPageNumbers()}</div>
            <div className="buttonBack" onClick={() => navigate("/superAdmin")}>
              Volver al panel
            </div>
          </>
        ) : (
          <div>Aún no han venido</div>
        )}
      </div>
    </>
  );
};
