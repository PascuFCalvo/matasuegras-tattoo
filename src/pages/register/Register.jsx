import { useState } from "react";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { Footer } from "../../common/footer/Footer";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [userError, setUserError] = useState({
    user_nameError: '',
    emailError: '',
    passwordError: '',
    phoneError: ''
  });

  const functionHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = validator(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  };

  const Submit = () => {
    for (let test1 in user) {
      if (user[test1] === "") {
        return;
      }
    }

    for (let test in userError) {
      if (userError[test] !== "") {
        return;
      }
    }

    registerUser(user)
      .then(resultado => {
        console.log(resultado);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch(error => console.log(error));
  };

  return (
    <div><div className="Register">
      <div className="formBackgroundRegister">
        <div className="overInput">Nombre</div>
        <CustomInput
          design={`customInput ${userError.user_nameError !== "" ? 'customInputError' : ''}`}
          type={"text"}
          name={"user_name"}
          placeholder={"YourName"}
          value={user.user_name}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.user_nameError}</div>
        <div className="overInput">email</div>
        <CustomInput
          design={`customInput ${userError.emailError !== "" ? 'customInputError' : ''}`}
          type={"email"}
          name={"email"}
          placeholder={"mail@yourdomain.com"}
          value={user.email}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.emailError}</div>
        <div className="overInput">Password</div>
        <CustomInput
          design={`customInput ${userError.passwordError !== "" ? 'customInputError' : ''}`}
          type={"password"}
          name={"password"}
          placeholder={"********"}
          value={user.password}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.passwordError}</div>
        <div className="overInput">Telefono</div>
        <CustomInput
          design={`customInput ${userError.phoneError !== "" ? 'customInputError' : ''}`}
          type={"text"}
          name={"phone"}
          placeholder={""}
          value={user.phone}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='errorMsg'>{userError.phoneError}</div>

        <div className='buttonSubmit' onClick={Submit}>Registrar</div>
        <div className = "blank"></div>
      </div>
      
    </div><Footer /></div>
    
  );
};
