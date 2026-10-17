import axios from "../../api/axios";
import { useDispatch } from "react-redux";
import { setIsShowLivre} from "../redux/detailescardSlice";
import { useState } from "react";
export  function useShowlivres(){
    const [lireShow,setLireShow]  = useState([])
    // const [isShowLivre, setIsShowLivre] = useState(null);
    const dispatch = useDispatch();
    const fetchShowlivres = async () => {
        try{
            const res = await axios.get("/showlivres")
             setLireShow(res.data.showlivres);
        }catch(err){
            console.error("Fetch error:", err);
        }
        
    }

    const checkShowlivres =  async (user,id) => {   
        try{  
        const res = await axios.post("/showlivres/check", {
            user_id: user,
            livre_id:  Number(id)
            });
            dispatch(setIsShowLivre(res.data.showlivre));
            console.log("Showlivres check response:", res.data.showlivre);
            // console.log("Showlivres check response:", res.data);
        }catch(err){
            console.log("BACKEND RESPONSE:", err.response?.data);
        }
    };

    const addShowlivres = async (user,id) => { 
        try{
        // console.log("Adding to Showlivres:", { user,  id });
        const res = await axios.post("/showlivres", {
            user_id: user,
            livre_id: Number(id)
            });
            await checkShowlivres(user, id);
            
        }catch(err){
            console.log("BACKEND RESPONSE:", err.response?.data);
        }
            
    };
    return {lireShow, fetchShowlivres,checkShowlivres, addShowlivres};
}