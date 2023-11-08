import "./Navbar.css"

export const Navbar = () => {
  let botones = [
    {
      id: 1,
      nombre: "INICIO",
    },
    {
      id: 2,
      nombre: "ESTUDIO",
    },
    {
      id: 3,
      nombre: "TATUADORES",
    },
    {
      id: 4,
      nombre: "GALERIA",
    },
    {
      id: 5,
      nombre: "PEDIR CITA",
    },
    {
      id: 6,
      nombre: "CONTACTO",
    },
  ];

  const elegido = (boton) => {
    console.log(boton);
  };

  return (
    <div className = "navbarButtons">
      {botones.map((boton) => {
        return (
          <div className="botonNavBar" key={boton.id} onClick={() => elegido(boton)} >
            {boton.nombre}
          </div>
        );
      })}
    </div>
  );
};
