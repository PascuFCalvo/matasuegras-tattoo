import "./NavbarLogin.css"

export const NavbarLogin = () => {
  let botones = [
    {
      id: 1,
      nombre: "LOGIN",
    },
    {
      id: 2,
      nombre: "REGISTRATE",
    },
    
  ];

  const elegido = (boton) => {
    console.log(boton);
  };

  return (
    <div className = "navbarButtonsLogin">
      {botones.map((boton) => {
        return (
          <div className="botonNavBarLogin" key={boton.id} onClick={() => elegido(boton)} >
            {boton.nombre}
          </div>
        );
      })}
    </div>
  );
};
