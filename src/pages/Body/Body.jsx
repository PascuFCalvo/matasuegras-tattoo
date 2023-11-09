import { Routes, Route } from 'react-router-dom';
import { Login } from '../Login/Login';
import { MainPage } from '../MainPage/MainPage';
import { Register } from '../Register/Register';
import { Gallery } from '../Gallery/Gallery';
import { ElEstudio } from '../ElEstudio/ElEstudio';
import { TattoArtist } from '../TattooArtist/TattooArtist';


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
                
                
            </Routes>
         </>
     )
}