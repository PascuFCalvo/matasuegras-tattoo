
import "./Register.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Footer } from "../../common/footer/Footer";

export const Register = () => {

  
  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

//   useEffect(()=>{
//     console.log(credenciales);
//   },[credenciales]);

  const logMe = () => {

    logUser(credenciales)
        .then(
            resultado => {
                console.log(resultado)
                //Aqui guardaría el token........

                //Una vez guardado el token....nos vamos a home....
                setTimeout(()=>{
                    navigate("/");
                },500);
            }
        )
        .catch(error => console.log(error));

  }

  


  return (
   <div><div className="Register"><div className="formBackgroundRegister">
      <div className="overInput">Nombre</div>
      <CustomInput
        design="customInput"
        type="email"
        name="email"
        placeholder=""
        functionProp={functionHandler}
      />
      <div className="overInput">eMail</div>
      <CustomInput
        design="customInput"
        type="email"
        name="email"
        placeholder=""
        functionProp={functionHandler}
      />
       <div className="overInput">Password</div>
      <CustomInput
        design="customInput"
        type="password"
        name="email"
        placeholder=""
        functionProp={functionHandler}
      />
       <div className="overInput">Telefono</div>
      <CustomInput
        design="customInput"
        type="number"
        name="email"
        placeholder=""
        functionProp={functionHandler}
      />
      
      <div className='buttonSubmit' onClick={logMe}>Registrarme</div>
    </div></div>
    
    <Footer  paddingTop="8"/> 
    </div>

   
    
  );
};