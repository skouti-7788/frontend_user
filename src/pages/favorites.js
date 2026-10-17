import { useSelector } from "react-redux";
import { useFavorite } from "../app/data/favoriteData";
import useLivres from "../app/data/database";
import { useEffect } from "react";
import  BookCard from '../components/home/bookcard';
export default function Favorites(){
    const { fetchFavorite } = useFavorite();
    const { livres,fetchLivres } = useLivres();
    const profile = useSelector((state) => state.profile);
    useEffect(() => {
        fetchFavorite();
        fetchLivres();
    }, []);
    
    const ok = JSON.parse(localStorage.getItem('ok'))
    const iduser =  ok?JSON.parse(localStorage.getItem('user')).id:null
    const idFavorite =  profile.favorites.map((favorite)=> favorite.user_id === iduser?favorite.livre_id:false)
    const favoriteBooks = livres.filter((livre) => idFavorite.includes(livre.id)); 
    console.log(profile)
    return(
        <div style={{marginTop:'50px',marginBottom:'50px'}} className='cards-h'>
            <h3>My Favorites</h3>
            <div className='cards'>
            {favoriteBooks.map((b)=>
                <BookCard key={b.id} book={b}/>
            )}
            </div>
        </div>
    );
}