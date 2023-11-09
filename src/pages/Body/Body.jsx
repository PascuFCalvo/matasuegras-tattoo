import { Routes, Route } from 'react-router-dom';
import { Login } from '../Login/Login';
import { MainPage } from '../MainPage/MainPage';
import { Register } from '../Register/Register';


export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                
            </Routes>
         </>
     )
}