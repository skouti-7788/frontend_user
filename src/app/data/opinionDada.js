import axios from "../../api/axios";
import { useDispatch } from "react-redux";
import { setOpinion } from "../redux/detailescardSlice";
export default function useOpinion() {
//   const livres = useSelector((state) => state.cards.livres);
  const dispatch = useDispatch();
  
    const fetchOpinion = async (livre_id) => {
      try {
        const res = await axios.get(`/livres/${livre_id}/opinions`);
        dispatch(setOpinion(res.data.opinions)); 
        console.log(res.data)
        console.log("Livres fetched successfully", res.data.opinions);
      } catch (err) {
        console.log("Error fetching livres", err.response?.data);
      }
    };
//   useEffect(() => {
//     fetchOpinion();
//   }, []);
    const addOpinion = async (id,livre_id, opinionText) => {
    try {
      const res = await axios.post("/opinions", {
        livre_id: livre_id,
        opinion: opinionText,
        user_id:id
       });
    
      // نعيد جيب الآراء باش الـ UI يتح更新
      if(livre_id){
      await fetchOpinion(livre_id);
      }
      console.log("Opinion ajoutée avec succès", res.data);
      return res.data;
    } catch (err) {
      console.log("Error posting opinion", err.response?.data);
      throw err;
    }
  };


  return {  addOpinion,fetchOpinion};
}