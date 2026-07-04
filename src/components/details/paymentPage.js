import React, { useState } from 'react';
import '../../css/paymentpage.css';
import { useDispatch } from 'react-redux';
import { setMessagePaye } from '../../app/redux/detailescardSlice';
import useAcheter from '../../app/data/acheterData';
export default  function PaymentPage({bookData,achatId,handleAcheter,setShowPaye}) {
    const dispatch = useDispatch()
    const {handlePayment} = useAcheter();
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.cardName.trim()) {
            newErrors.cardName = "Le nom sur la carte est requis.";
        }
        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = "Le numéro de carte est requis.";
        }
        if (!formData.expiry.trim()) {
            newErrors.expiry = "La date d'expiration est requise.";
        }
        if (!formData.cvv.trim()) {
            newErrors.cvv = "Le CVV est requis.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePay = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await handlePayment(achatId, formData);
            dispatch(setMessagePaye('Paiement accepté'));
            handleAcheter();
            setShowPaye(false);
        } catch (err) {
            const responseErrors = err.response?.data?.errors;
            if (responseErrors) {
                const formattedErrors = Object.fromEntries(
                    Object.entries(responseErrors).map(([key, value]) => [key, value?.[0] || 'Erreur inconnue'])
                );
                setErrors(formattedErrors);
            } else {
                setErrors({ form: 'Le paiement a échoué. Veuillez réessayer.' });
            }
            dispatch(setMessagePaye('Le paiement a échoué'));
            console.error('Payment failed:', err);
        }
    };
    const book = bookData || {
        title: "Livre PDF ",
        price: 49.00,
        currency: "DH"
    };
    // console.log(book)
    return (
        <div className="checkout-container">
            <span  className='back-button'
            onClick={()=>setShowPaye(false)}>back</span>
            {/* L-jiha dyal l-Formulaire */}
            <div className="payment-form-section">
                <h2 style={{marginBottom: '20px'}}>Paiement par Carte Bancaire</h2>
                
                <div className="bank-badges">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Logo_CIH_Bank.png" alt="CIH" />
                </div>

                <form onSubmit={handlePay}>
                    <div className="form-group">
                        <label>Nom sur la carte</label>
                        <input 
                            type="text" 
                            name="cardName" 
                            placeholder="M. REDWAN XXXX" 
                            value={formData.cardName}
                            onChange={handleChange}
                        />
                        {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                    </div>

                    <div className="form-group">
                        <label>Numéro de carte</label>
                        <input 
                            type="text" 
                            name="cardNumber" 
                            placeholder="0000 0000 0000 0000" 
                            maxLength="16"
                            value={formData.cardNumber}
                            onChange={handleChange}
                        />
                        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                    </div>

                    <div className="card-details-grid">
                        <div className="form-group">
                            <label>Date d'expiration</label>
                            <input 
                                type="text" 
                                name="expiry" 
                                placeholder="MM/YY" 
                                maxLength="5"
                                value={formData.expiry}
                                onChange={handleChange}
                            />
                            {errors.expiry && <span className="error-message">{errors.expiry}</span>}
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input 
                                type="password" 
                                name="cvv" 
                                placeholder="123" 
                                maxLength="3"
                                value={formData.cvv}
                                onChange={handleChange}
                            />
                            {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                        </div>
                    </div>

                    <button type="submit" className="pay-button">
                        Confirmer
                    </button>
                </form>
                
                <p style={{fontSize: '12px', color: '#9ca3af', marginTop: '15px', textAlign: 'center'}}>
                    🔒 Vos données sont cryptées et sécurisées.
                </p>
            </div>

            {/* L-jiha dyal Summary (Résumé) */}
            {/* <div className="order-summary">
                <h3 style={{marginBottom: '15px'}}>Résumé de la commande</h3>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <span>Livre PDF (Library Manager)</span>
                    <strong>49.00 DH</strong>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <span>Frais de service</span>
                    <strong>0.00 DH</strong>
                </div>
                <hr style={{margin: '15px 0', border: '0', borderTop: '1px solid #e5e7eb'}} />
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold'}}>
                    <span>Total</span>
                    <span style={{color: '#2563eb'}}>49.00 DH</span>
                </div>
            </div> */}
            <div className="checkout-container">
            {/* ... L-jiha dyal l-form (nefs l-kod li fat) ... */}

            <div className="order-summary">
                <h3 style={{marginBottom: '15px'}}>Résumé de la commande</h3>
                
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    {/* Hna t-beddel smiya */}
                    <span>{book.title}</span>
                    <strong>{book.prix}  DH</strong>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <span>Frais de service</span>
                    <strong>0.00  DH</strong>
                </div>

                <hr style={{margin: '15px 0', border: '0', borderTop: '1px solid #e5e7eb'}} />
                
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold'}}>
                    <span>Total</span>
                    {/* Hna l-x-am3 l-total */}
                    <span style={{color: '#2563eb'}}>
                        {book.prix}  DH
                    </span>
                </div>
            </div>
        </div>
        </div>
    );
};
 