// import { useState } from "react";
// import axios from "../../api/axios";
// import { useDispatch, useSelector } from "react-redux";
// // Add relevant imports for slices if needed

// export default function useAcheter() {
//     const dispatch = useDispatch();
//     // Add selectors as needed
//     const [achater,setAchater] = useState([])
//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     // const status_paye = useSelector((state) => state.detailescard.status_paye);
//     const [success, setSuccess] = useState(false);
//     const [message, setMessage] = useState('');
//     const fetchAchater = async () => {
//         try{
//             const res = await axios.get('/acheter')
//            setAchater(res.data)  
//         }catch(err){
//             console.log(err)
//         }
//     }
//     const acheterBook = async (bookId,title) => {
//         // if(success) {
//             try {
//                 const res = await axios.post("/acheter", {
//                     status:title,
//                     user_id: user.id,
//                     livre_id: bookId,
//                     date_achat: new Date().toISOString().split('T')[0],
//                 });
//                 return res.data; // Return the response data
//             } catch (err) {
//                 console.log("BACKEND RESPONSE:", err.response?.data);
//                 if (err.response?.data?.message === 'Invalid token') {
//                     alert("Please log in again");
//                     // dispatch(setClose(true));
//                 }
//                 throw err; // Re-throw to handle in component
//             }
//         // }
//     };

//     const handlePayment = async (achatId, livreId, cardData) => {
//         try {
//             const res = await axios.post(`/acheter/${achatId}/payment`,{
//             ...cardData,
//             livre_id: livreId,
//            });
//             setSuccess(res.data.success)
//             setMessage(res.data.message)
//             return res.data;
//         } catch (err) {
//             console.log("PAYMENT ERROR:", err.response?.data);
//             throw err;
//         }
//     };

//     const acceptOrder = async (achatId) => {
//         try {
//             const res = await axios.put(`/acheter/${achatId}/accept`);
      
//             return res.data;
//         } catch (err) {
//             console.log("ACCEPT ERROR:", err.response?.data);
//             throw err;
//         }
//     };

//     const rejectOrder = async (achatId) => {
//         try {
//             const res = await axios.put(`/acheter/${achatId}/reject`);
//             return res.data;
//         } catch (err) {
//             console.log("REJECT ERROR:", err.response?.data);
//             throw err;
//         }
//     };

//     const cancelPayment = async (achatId) => {
//         try {
//             const res = await axios.put(`/acheter/${achatId}/cancel-payment`);
//             return res.data;
//         } catch (err) {
//             console.log("CANCEL PAYMENT ERROR:", err.response?.data);
//             throw err;
//         }
//     };

//      const updateAcheter = async (id,status_paye) => {
            
//         try {
//             const res = await axios.put(`/acheter/${id}`, {
//                 status_paye:status_paye
//             });
//             // if (res.data.message) {
//             //     alert(res.data.message);
//             // }
//         } catch (err) {
//             console.log("BACKEND RESPONSE:", err.response?.data);
//             if (err.response?.data?.message === 'Invalid token') {
//                 alert("Please log in again");
//                 // dispatch(setClose(true));
//             }
//         }
//     };
//     // Add logic to trigger acheterBook when needed

//     return {achater,success,message,fetchAchater, acheterBook,updateAcheter, handlePayment, acceptOrder, rejectOrder, cancelPayment };
// }
import { useState, useCallback } from "react";
import axios from "../../api/axios";
import { useDispatch } from "react-redux";

export default function useAcheter() {
    const dispatch = useDispatch();
    const [achater, setAchater] = useState([])
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const fetchAchater = useCallback(async () => {
        try {
            const res = await axios.get('/acheter')
            setAchater(res.data)
        } catch (err) {
            console.log(err)
        }
    }, []);

    const acheterBook = async (bookId, title) => {
        try {
            const res = await axios.post("/acheter", {
                status: title,
                user_id: user.id,
                livre_id: bookId,
                date_achat: new Date().toISOString().split('T')[0],
            });
            return res.data;
        } catch (err) {
            console.log("BACKEND RESPONSE:", err.response?.data);
            throw err;
        }
    };

    const handlePayment = async (achatId, livreId, cardData) => {
        try {
            const res = await axios.post(`/acheter/${achatId}/payment`, {
                ...cardData,
                livre_id: livreId,
            });
            // console.log(res.data.success)
            setSuccess(res.data.success)
            setMessage(res.data.message)
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

    const updateAcheter = async (id, status_paye) => {
        try {
            const res = await axios.put(`/acheter/${id}`, { status_paye });
        } catch (err) {
            console.log("BACKEND RESPONSE:", err.response?.data);
        }
    };
     return { achater, success, message, fetchAchater, acheterBook, updateAcheter, handlePayment, acceptOrder, rejectOrder, cancelPayment };
}