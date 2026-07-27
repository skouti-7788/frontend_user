// import Panier from "../components/home/panier";
import ImageBox from "../components/home/imageBox";
import Cards from "../components/home/cards"
import StyleImage from "../components/home/styleimage";
import StatsBar from "../components/home/statsBar";
import AuteursPopulaires from '../components/home/auteursPopulaires'
import Newsletter from '../components/home/newsletter'
import Temoignages from '../components/home/temoignages'

// import Footer from "../components/home/footer"
// import Categorie from "../components/categorie";

export default function Home(){

    return(
        <div>
            <ImageBox />
           
            {/* <div style={{display:'flex',gap:'3%'}}> */}
                 <Cards/>
                 {/* <Categorie/>
            </div> */}
            <AuteursPopulaires/>
            <Temoignages/>      
            {/* <Newsletter/> */}
           
        </div>
    )
}