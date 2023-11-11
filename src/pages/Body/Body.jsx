import { Routes, Route } from 'react-router-dom';
import { Login } from '../Login/Login';
import { MainPage } from '../MainPage/MainPage';
import { Register } from '../register/Register';
import { Gallery } from '../Gallery/Gallery';
import { ElEstudio } from '../ElEstudio/ElEstudio';
import { TattoArtist } from '../TattooArtist/TattooArtist';
import { Appointment } from '../Appointment/Appointment';
import { Contact } from '../Contact/Contact';


export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/gallery" element={<Gallery />}/>
                <Route path="/elestudio" element={<ElEstudio />}/>
                <Route path="/tatuadores" element={<TattoArtist />}/>
                <Route path="/cita" element={<Appointment />}/>
                <Route path="/contacto" element={<Contact />}/>


                
                
            </Routes>
         </>
     )
}