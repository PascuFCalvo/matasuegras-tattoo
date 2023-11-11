
import { FooterBlack } from '../../common/FooterBlack/FooterBlack'
import { MainEstudio } from '../../common/MainEstudio/MainEstudio'
import { MainTattoArtist } from '../../common/MainTattooArtist/MainTattooArtist'
import { StylesSection } from '../../common/StylesSection/StylesSection'
import { Footer } from '../../common/footer/Footer'
import { Logo } from '../../common/logo/logo'
import './MainPage.css'
export const MainPage = () => {
     return (
      <><div className="MainPage">
            <Logo />
           <Footer />   
         </div>
         <StylesSection />
         <MainEstudio/>
         <MainTattoArtist />
         <FooterBlack></FooterBlack></>
         
     )
}