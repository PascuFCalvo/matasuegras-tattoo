import { jwtDecode } from "jwt-decode";
import "./NavbarLogin.css";
import { useNavigate } from "react-router-dom";



export const NavbarLogin = ( ) => {
  const navigate = useNavigate();

   const isLoggedIn = localStorage.getItem('token');
    console.log(isLoggedIn)

  let decoded = {};
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  const userLevel = localStorage.getItem('level');
  console.log(userLevel);

  let botones = isLoggedIn
    ? [
        {
          id: 1,
          nombre: "LOG OUT",
          onClick: () => {
            localStorage.removeItem('token');
            navigate("/login");
          },
        },
      ]
    : [
        {
          id: 1,
          nombre: "LOGIN",
          path: "/login",
        },
        {
          id: 2,
          nombre: "REGISTRATE",
          path: "/register",
        },
      ];

  return (
    <div className="navbarButtonsLogin">
      {botones.map((boton) => {
        return (
          <div
            className="botonNavBarLogin"
            key={boton.id}
            onClick={boton.onClick ? boton.onClick : () => navigate(boton.path)}
            style={{ color: boton.nombre === "LOG OUT" ? '' : '' }}
          >
            {boton.nombre}
          </div>
        );
      })}
    </div>
  );
};



// export const NavbarLogin = ( ) => {

//     c

  
//     return (
//     <div className="navbarButtonsLogin">
//       <div className='botonNavBarLogin'>LOGIN</div>
//       <div className='botonNavBarLogin'>REGISTER</div>
//     </div>
//     );
//   }


