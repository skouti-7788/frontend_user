 import ImageBox from "../components/home/imageBox";
import Cards from "../components/home/cards"

import AuteursPopulaires from '../components/home/auteursPopulaires'
import Temoignages from '../components/home/temoignages'
 
export default function Home(){

    return(
        <div>
            <ImageBox />
           
                  <Cards/>
            
            <AuteursPopulaires/>
            <Temoignages/>      
            
        </div>
    )
}