import { Header } from "../../common/header/Header";
import { Body } from "../Body/Body";

import "./Home.css";

export const Home = () => {
  return (
    <div className="homeBodyInner">
      <Header />
      <Body />
    </div>
  );
};
