import '../../css/messagepaye.css';
import secureImage from '../../images/success.png';
export default function MessagePaye({message}) {
     return (
        <div className="message-paye">
             <h>{message}</h>
             <img src={secureImage} alt="Secure Payment" className="secure-image" />
        </div>
    );
}