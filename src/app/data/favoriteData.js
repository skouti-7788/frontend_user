import axios from "../../api/axios";
import { setFavorites } from "../redux/profileSlice";
import { useDispatch } from "react-redux";
import { useCallback,useState } from "react";
export  function useFavorite(){
    const dispatch = useDispatch();
    const [isFavorite,setIsFavorite] = useState(false);
    // const [loadingFavorite, setLoadingFavorite] = useState(true);
    const fetchFavorite = async () => {
                const res = await axios.get("/favorite")
                dispatch(setFavorites(res.data.favorites));
                // setIsFavorite(res.data.favorites)
                // console.log(res.data.favorites)
    }
    const checkFavorite = useCallback( async (user,id) => {
            
                // setLoadingFavorite(true);
                const res = await axios.post("/favorite/check", {
                user_id: user,
                livre_id:  Number(id)
                });
                setIsFavorite(res.data.favorite);
                // console.log("Favorite"  , res.data.favorite);
                // setLoadingFavorite(false);
                // addHistory(res.data.favorite ? 1 : 0);
                // console.log("Favorite"  , res.data.favorite);
    },[]);
    const toggleFavorite = async (user,id) => {
        if (isFavorite) {
            await axios.delete("/favorite", {
            data: { user_id: user, livre_id: Number(id) }
            });
            setIsFavorite(false);
           await checkFavorite(user, id);
        } else {
            await axios.post("/favorite", {
            user_id: user,
            livre_id: Number(id)
            });
            setIsFavorite(true);
            await checkFavorite(user, id);
             
        }
    };
    return { fetchFavorite,checkFavorite, toggleFavorite, isFavorite,
        //  loadingFavorite 
        };
}