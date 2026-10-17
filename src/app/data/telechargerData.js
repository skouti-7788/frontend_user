import { useState } from "react";
import axios from "../../api/axios";
 // Add relevant imports for slices if needed

export default function useTelecharger() {
     // Add selectors as needed
    const [telechar,setTelchar] = useState([])
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const fetchTelecharger = async () => {
        try{
            const res = await axios.get('/telecharger')
              setTelchar(res.data)
        }catch(err){
                console.log(err)
        }
    }
    const telechargerBook = async (bookId) => {
        try {
            const res = await axios.post("/telecharger", {
                user_id: user.id,
                livre_id: bookId,
                date_telechargement: new Date().toISOString().split('T')[0],
                status:''
            });
            if (res.data.message) {
                alert(res.data.message);
            }
            // Handle download logic, e.g., trigger file download
        } catch (err) {
            console.log("BACKEND RESPONSE:", err.response?.data);
            if (err.response?.data?.message === 'Invalid token') {
                alert("Please log in again");
                // dispatch(setClose(true));
            }
        }
    };

    // Add logic to trigger telechargerBook when needed

    return {telechar,fetchTelecharger, telechargerBook };
}