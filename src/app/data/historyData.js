import axios from "../../api/axios";
import { setIsRate ,setShowrate,clearRate} from "../redux/detailescardSlice";
import { useDispatch, useSelector } from "react-redux";
import { setClose } from "../redux/logSlice";
import { useState } from "react";
// import useLivres from "./database";
export  function useHistory(){
  //  const [isRate, setIsRate] = useState(0.0);
    // const { fetchLivres } = useLivres();
    const dispatch = useDispatch();
    const detailescard = useSelector((state)=> state.detailescard)
    // const show = useSelector((state)=> state.loguser)
    // console.log(detailescard.rate)
    // console.log(detailescard)
    const [history, setHistory] = useState([]);
    const user = JSON.parse( localStorage.getItem("user")) || null;
    // console.log(user)
    
     const fetchHistory = async () => {
      try {
        const res = await axios.get("/history");
        // console.log(res.data);
        setHistory(res.data.history);
      } catch (err) {
        console.error("Fetch error:", err);
      }
      // dispatch(setNewRate(res.data.newRate))
      };
      // useEffect(() => {
      // fetchHistory();
      // }, []);
    const checkHistory =  async (title,rate,id) => {
        try{      
           
          const res = await axios.post("/history/check", {
          nom: user.username||'',
          email: user.email|| '',
          livre: title || '',
          rate: detailescard.rate || rate || 0.0,
          // favorie:favorie || 0,
          livre_id: id, 
          user_id: user.id
          });
          console.log('res.data.rate:', res.data.rate);
          dispatch(setIsRate(res.data.rate));
          // setLoadingFavorite(false);
        }catch(err){ 
          console.log("BACKEND RESPONSE:", err.response?.data);
             
        }           
        };
    const addHistory = async (title,rate,id) => {
      
      try{
          const res = await axios.post("/history",{
            nom: user.username||'',
            email: user.email|| '',
            livre: title || '',
            rate: detailescard.rate || rate || 0.0,
            // favorie:favorie || 0,
            livre_id: id, 
            user_id: user.id
          }); 
          await checkHistory(title,rate, id)
          dispatch(clearRate())
          dispatch(setShowrate({title:'',showrate:false}))
          // await fetchHistory();
          // await fetchLivres();
         

        }catch(err){ 
          console.log("BACKEND RESPONSE:", err.response?.data);
            if(err.response?.data?.message === 'Invalid token'){
              alert("Please log in again");
              dispatch(setClose(true));
            };
        }
       
    } 
   
   
  
     
   return { fetchHistory, checkHistory, history, addHistory };
 
}