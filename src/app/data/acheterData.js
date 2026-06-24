import { useState } from "react";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
// Add relevant imports for slices if needed

export default function useAcheter() {
    const dispatch = useDispatch();
    // Add selectors as needed
    const [achater,setAchater] = useState([])
    const user = JSON.parse(localStorage.getItem("user")) || {};
    // const status_paye = useSelector((state) => state.detailescard.status_paye);
    const fetchAchater = async () => {
        try{
            const res = await axios.get('/acheter')
           setAchater(res.data)  
        }catch(err){
            console.log(err)
        }
    }
    const acheterBook = async (bookId) => {
         
        try {
            const res = await axios.post("/acheter", {

                user_id: user.id,
                livre_id: bookId,
                date_achat: new Date().toISOString().split('T')[0],
            });
            return res.data; // Return the response data
        } catch (err) {
            console.log("BACKEND RESPONSE:", err.response?.data);
            if (err.response?.data?.message === 'Invalid token') {
                alert("Please log in again");
                // dispatch(setClose(true));
            }
            throw err; // Re-throw to handle in component
        }
    };

    const handlePayment = async (achatId, cardData) => {
        try {
            const res = await axios.post(`/acheter/${achatId}/payment`, cardData);
            return res.data;
        } catch (err) {
            console.log("PAYMENT ERROR:", err.response?.data);
            throw err;
        }
    };

    const acceptOrder = async (achatId) => {
        try {
            const res = await axios.put(`/acheter/${achatId}/accept`);
            return res.data;
        } catch (err) {
            console.log("ACCEPT ERROR:", err.response?.data);
            throw err;
        }
    };

    const rejectOrder = async (achatId) => {
        try {
            const res = await axios.put(`/acheter/${achatId}/reject`);
            return res.data;
        } catch (err) {
            console.log("REJECT ERROR:", err.response?.data);
            throw err;
        }
    };

    const cancelPayment = async (achatId) => {
        try {
            const res = await axios.put(`/acheter/${achatId}/cancel-payment`);
            return res.data;
        } catch (err) {
            console.log("CANCEL PAYMENT ERROR:", err.response?.data);
            throw err;
        }
    };

     const updateAcheter = async (id,status_paye) => {
            
        try {
            const res = await axios.put(`/acheter/${id}`, {
                status_paye:status_paye
            });
            if (res.data.message) {
                alert(res.data.message);
            }
        } catch (err) {
            console.log("BACKEND RESPONSE:", err.response?.data);
            if (err.response?.data?.message === 'Invalid token') {
                alert("Please log in again");
                // dispatch(setClose(true));
            }
        }
    };
    // Add logic to trigger acheterBook when needed

    return {achater,fetchAchater, acheterBook,updateAcheter, handlePayment, acceptOrder, rejectOrder, cancelPayment };
}