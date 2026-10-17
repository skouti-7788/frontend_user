import { useState, useCallback } from "react";
import axios from "../../api/axios";

export default function useAcheter() {
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
            await axios.put(`/acheter/${id}`, { status_paye });

        } catch (err) {
            console.log("BACKEND RESPONSE:", err.response?.data);
        }
    };
     return { achater, success, message, fetchAchater, acheterBook, updateAcheter, handlePayment, acceptOrder, rejectOrder, cancelPayment };
}