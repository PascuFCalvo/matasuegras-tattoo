import { Footer } from "../../common/footer/Footer";
import { Header } from "../../common/header/header";
import { Logo } from "../../common/logo/logo";
import "./Home.css";

export const Home = () => {
  return (
    <div className="homeBody">
      <div className="homeBodyInner"></div>
      <Header />
      <Logo />
      <Footer />
    </div>
  );
};
