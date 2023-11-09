import { Footer } from "../../common/footer/Footer";
import { Header } from "../../common/header/Header";
import { Body } from "../Body/Body";


import "./Home.css";

export const Home = () => {
  return (
    <div className="homeBody">
      <div className="homeBodyInner">
      <Header />
      <Body />
      <Footer />  
      </div>
      
    </div>
  );
};
