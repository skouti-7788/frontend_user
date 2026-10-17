import '../../css/achCard.css'
import '../../css/opinion.css'
import { setEmprunter, setMessagePaye } from '../../app/redux/detailescardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Show } from '../../app/redux/logSlice'
import useBook from '../../app/data/bookData'
import { setLire } from '../../app/redux/profileSlice'
import { useEffect, useState } from 'react'
import Reader from './lireLivre';
import PaymentPage from './paymentPage'
import useTelecharger from '../../app/data/telechargerData'
import useAcheter from '../../app/data/acheterData'
// import paymentPage from './paymentPage'

export default function AchCard({is_free,book,bookId, 
    stats = { lire: 0, telecharger: 0, emprunter: 0, acheter: 0 },showPaye,bookData,
    setShowPaye,file_url,download_link}) {
         

    useBook()
    const {telechargerBook} = useTelecharger()
    const { achater, fetchAchater, acheterBook, updateAcheter } = useAcheter()   
    const ok = useSelector((state) => state.loguser.ok)
    const dispatch = useDispatch()
    // console.log('achater',achater)
    const [showDate, setShowDate] = useState(false)
    const [dateRetour, setDateRetour] = useState("")
    const [showBuy, setShowBuy] = useState(false)
    const [showMethod, setShowMethod] = useState(false) 
    const user = JSON.parse(localStorage.getItem('user'))
    const [adresse, setAdresse] = useState("")
    const [ville, setVille] = useState("")
    const [telephone, setTelephone] = useState("")
    const [selected, setSelected] = useState(null);
    const [arret,setArret] = useState(false)
    const [arretAchat,setArretAchat] = useState(false)
    const achet = useSelector((state)=> state.detailescard)
    // const [titleAch,setTitleAch] = useState('')
    // ✅ close modal
    const handleClose = () => {
        setShowDate(false)
        setShowMethod(false)
    }
    // const showLire = useSelector((state) => state.profile.lire)
    // ✅ submit borrow
    const handleEmprunt = () => {
        // console.log("Date retour:", dateRetour)
        if(user){
        dispatch(setEmprunter(dateRetour))

        dispatch(Show(ok ? null : true))
        setShowDate(false)}else{
            dispatch(Show(true))
        } 
    }
    const handleAchat = () => {
        // Ici on pourrait envoyer l'adresse au backend pour la livraison
        setShowBuy(false)
    }
    const handleTelech = () =>{
    telechargerBook(bookId)
    }
  
const methods = [
  {
    id: "pdf",
    icon: "📄",
    title: "Livre PDF",
    subtitle: "Téléchargement instantané",
    description:
      "Achetez et téléchargez votre livre en format PDF immédiatement après le paiement. Lisez-le sur n'importe quel appareil : téléphone, tablette ou ordinateur. Pas de frais de livraison, accès 24h/24.",
    badge: "Instantané",
  },
  {
    id: "physique",

    icon: "📚",
    title: "Livre Physique",
    subtitle: "Livraison à domicile",
    description:
      "Commandez un vrai livre imprimé livré directement chez vous. Profitez du plaisir de tenir un vrai livre entre vos mains. Idéal comme cadeau ou pour votre bibliothèque personnelle.",
    badge: "Livraison",
  },
];
    const title  =  methods.find((m) =>  m.id === selected)?.title
    
    const handleAcheter = async (title) => {
        if (!title) return;

        try {
            await acheterBook(bookId, title)
            setArretAchat(true)
         } catch (err) {
            console.error('Achat échoué :', err)
        }
    }
    
    useEffect(() => {
        fetchAchater()
    }, [fetchAchater])
 
    const handleContinu = () => {
    if (user) {
        setShowMethod(false);
        setShowBuy(title === 'Livre Physique' ? true : false);
        setShowPaye(title === 'Livre PDF' ? true : false);
        handleAcheter(title);
    } else {
        dispatch(Show(true))
    }
    }
 
    useEffect(() => {
        if (!arret || !Array.isArray(achater)) {
            return;
        }

        const newacheter = achater.find(
            (achat) => Number(achat.livre_id) === Number(bookId)  &&
               achat.status === title
        );

        if (!newacheter) {
            console.log("Aucun achat trouvé pour ce livre");
            setArret(false);
            return;
        }
        
        updateAcheter(newacheter.id, achet.messagePaye);

        setArret(false);
        if (arretAchat) {
            dispatch(setMessagePaye("Livraison du livre en attente"));
            setArretAchat(false);
        }
    }, [arretAchat, arret, achater, achet.messagePaye, bookId, dispatch,
        updateAcheter,setArretAchat,title,setArret,]);
  
    return (
        <div className='achcard'>
            {!showPaye&&<div>
             <div className='achcard-info'>
                <div className='btn-wrapper'>
                    <button
                        className='btn-read'
                        disabled={!is_free}
                        onClick={() => dispatch(setLire(true))}
                    >
                        Lire
                    </button>
                    <span className='btn-stat'>{stats.lire} lectures</span>
                </div>

                <div className='btn-wrapper'>
                    <button 
                     className='btn-download' 
                     disabled={!is_free} 
                     onClick={handleTelech}
                     >Télécharger</button>
                     <span className='btn-stat'>{stats.telecharger} téléchargements</span>
                </div>

                <div className='btn-wrapper'>
                    <button className='btn-borrow' onClick={() => setShowDate(true)}>
                        Emprunter
                    </button>
                    <span className='btn-stat'>{stats.emprunter} emprunts</span>
                </div>

                <div className='btn-wrapper'>
                    
                    <button className='btn-buy' onClick={() => setShowMethod(true)}>
                        Acheter
                    </button>
                    <span className='btn-stat' >{stats.acheter} achats</span>
                </div>
            </div>
             <Reader title={title} file_url={file_url}/>
            {showDate && (
                <div className="opinion-overlay" onClick={handleClose}>
                    <div
                        className="opinion-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button className="opinion-close" onClick={handleClose}>
                            ✕
                        </button>

                        <h5>Emprunter le livre</h5>

                        <label>Veuillez choisir une date de retour</label>
                        <input
                            type='date'
                            value={dateRetour}
                            onChange={(e) => setDateRetour(e.target.value)}
                        />

                        <button
                            className="opinion-btn"
                            onClick={handleEmprunt}
                            disabled={!dateRetour}
                        >
                            Confirmer
                        </button>

                    </div>
                </div>
            )}
            {showMethod && 
              <div className="opinion-overlay"  >

                    <div className="page-selection"> 
                        <button className="opinion-close" onClick={handleClose}>
                            ✕
                        </button>
                    <div className="po-header">
                        <p className="po-label">Choisissez votre méthode</p>
                        <h1 className="po-title">
                            Comment voulez-vous <em>acheter ?</em>
                        </h1>
                    </div>
                                
                    <div className="po-grid">
                        {methods.map((m) => (
                        <div
                            key={m.id}
                            className={`po-card po-card-${m.id} ${selected === m.id ? "is-selected" : ""}`}
                            onClick={() => setSelected(m.id)}
                        >
                            <div className={`po-card-glow po-card-glow-${m.id}`} />
                            <span className={`po-card-badge po-card-badge-${m.id}`}>{m.badge}</span>
                            <div className="po-card-icon">{m.icon}</div>
                            <h2 className="po-card-title">{m.title}</h2>
                            <p className={`po-card-subtitle po-card-subtitle-${m.id}`}>{m.subtitle}</p>
                            <p className="po-card-desc">{m.description}</p>
                           
                        </div>
                        ))}
                    </div>
                                
                    {selected && (
                        <div className="po-confirm-box">
                            <p className="po-confirm-text">
                                Vous avez choisi :{" "}
                                <strong>{title}</strong>
                            </p>
                            <button className="po-confirm-btn" onClick={handleContinu}>
                                Continuer
                            </button>
                        </div>
                    )}
                   </div>
                 
                </div>  } 
            {showBuy && (
                <div className="opinion-overlay"  >
                    <div
                        className="opinion-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className="opinion-close"
                            onClick={() => setShowBuy(false)}
                        >
                            ✕
                        </button>

                        <h5>Informations de livraison</h5>

                        <label>Adresse</label>
                        <input
                            type="text"
                            placeholder="Votre adresse"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                        />

                        <label>Ville</label>
                        <input
                            type="text"
                            placeholder="Votre ville"
                            value={ville}
                            onChange={(e) => setVille(e.target.value)}
                        />

                        <label>Téléphone</label>
                        <input
                            type="text"
                            placeholder="06XXXXXXXX"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />

                        <button
                            className="opinion-btn"
                            onClick={handleAchat}
                            disabled={!adresse || !ville || !telephone}
                        >
                            Confirmer la commande
                        </button>

                    </div>
                </div>
            )}</div>}
       {showPaye &&<PaymentPage handleAcheter={handleAcheter} achatId={user.id} bookData={bookData} bookId={bookId}setShowPaye={setShowPaye} />}
        </div>
    )

}