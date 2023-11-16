import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer } from "../../common/footer/Footer";
import { validator } from "../../services/useful";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');
  let decoded = {};
  if (isLoggedIn) {
    decoded = jwtDecode(isLoggedIn);
    console.log(decoded);
    localStorage.setItem("level", decoded.level);
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  },);

  

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [credencialesError, setCredencialesError] = useState({
    
    emailError: '',
    passwordError: '',
    
  });

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = validator(e.target.name, e.target.value);

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  };

  useEffect(() => {
    console.log(credenciales);
  }, [credenciales]);

  const logMe = () => {
    logUser(credenciales)
      .then((resultado) => {
        
        
        
        localStorage.setItem("token", resultado.data.token)
        //Una vez guardado el token....nos vamos a home....
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="Login">
        <div className="formBackground">
          <div className="overInput">eMail</div>
          <CustomInput
            design={`customInput ${credencialesError.emailError !== "" ? 'customInputError' : ''}`}
            type="email"
            name="email"
            placeholder="mail@domain.com"
            functionProp={functionHandler}
            functionBlur={errorCheck}
            
          />
          <div className='errorMsg'>{credencialesError.emailError}</div>
          <div className="overInput">Password</div>
          <CustomInput
            design={`customInput ${credencialesError.passwordError !== "" ? 'customInputError' : ''}`}
            type="password"
            name="password"
            placeholder="********"
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div className='errorMsg'>{credencialesError.passwordError}</div>
          <div className="buttonSubmitLogin" onClick={logMe}>
            Log Me!
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
