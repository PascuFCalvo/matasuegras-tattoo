import  { useState, useEffect } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { jwtDecode } from "jwt-decode";

//Importo Rdx

import { useSelector, useDispatch } from "react-redux";  //useDispatch es necesario para emitir acciones
import { login, userData } from "../userSlice";
import { Footer } from "../../common/footer/Footer";


export const Login = () => {

  const navigate = useNavigate();

  const rdxUserData = useSelector(userData);
  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [credencialesError, setCredencialesError] = useState({
    
    emailError: '',
    passwordError: '',
    
  });

  const [msgError, setMsgError] = useState('');

  useEffect(()=>{
    if(rdxUserData.credentials.token){
      navigate("/")
    }
  },[navigate, rdxUserData])

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const errorCheck = (e) => {
    let error = validator(e.target.name, e.target.value);

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  };

  const logMe = () => {

    logUser(credenciales)
        .then(
            resultado => {

                let decodificado = jwtDecode(resultado.data.token);
                console.log("soy el token decodificado....", decodificado);
                //Aqui guardaría el token........en RDXXX
                dispatch(login({ credentials: resultado.data }))

                //Una vez guardado el token....nos vamos a home....
                setTimeout(()=>{
                    navigate("/");
                },500);
            }
        )
        .catch(error => {
          console.log(msgError)
          setMsgError(error.message);
        });

  }

  return (
    <div>
      <div className="Login">
        <div className="formBackground">
          <div className="overInputlogin">eMail</div>
          <CustomInput
            design={`customInput ${credencialesError.emailError !== "" ? 'customInputError' : ''}`}
            type="email"
            name="email"
            placeholder="mail@domain.com"
            functionProp={functionHandler}
            functionBlur={errorCheck}
            
          />
          <div className='errorMsg'>{credencialesError.emailError}</div>
          <div className="overInputlogin">Password</div>
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