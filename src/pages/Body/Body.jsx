import { Routes, Route } from 'react-router-dom';
import { Login } from '../Login/Login';
import { MainPage } from '../MainPage/MainPage';
import { Register } from '../register/Register';
import { Gallery } from '../Gallery/Gallery';
import { ElEstudio } from '../ElEstudio/ElEstudio';
import { TattoArtist } from '../TattooArtist/TattooArtist';
import { Appointment } from '../Appointment/Appointment';
import { Contact } from '../Contact/Contact';

import { MainSuperAdmin } from '../MainSuperAdmin/MainSuperAdmin';
import { SuperAdminUsers } from '../SuperAdminUsers/SuperAdmin';
import { SuperAdminAppointments } from '../SuperAdminAppointments/SuperAdminAppointments';
import { BlackAlienInfo } from '../BlackAlienInfo/BlackAlienInfo';
import { DewisConsinInfo } from '../DewisConsinInfo/DewisConsinInfo';
import { AliceInfo } from '../AliceInfo/Aliceinfo';
import { SentoInfo } from '../SentoInfo/SentoInfo';
import { DonRogelioInfo } from '../DonRogelioInfo/DonRogelioInfo';


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
                <Route path="/superAdmin" element={<MainSuperAdmin />}/>
                <Route path="/superAdmin/superAdminUsers" element={<SuperAdminUsers />}/>
                <Route path="/superAdmin/superAdminAppointments" element={<SuperAdminAppointments />}/>
                <Route path="/tatuadores/blackAlien" element={<BlackAlienInfo />}/>
                <Route path="/tatuadores/dewisConsin" element={<DewisConsinInfo />}/>
                <Route path="/tatuadores/alice" element={<AliceInfo />}/>
                <Route path="/tatuadores/sento" element={<SentoInfo />}/>
                <Route path="/tatuadores/donRogelio" element={<DonRogelioInfo />}/>





                
                
            </Routes>
         </>
     )
}