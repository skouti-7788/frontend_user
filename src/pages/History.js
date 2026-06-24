import { useEffect,useState } from "react";
import { useShowlivres } from "../app/data/showlivresData";
import { setAcheter } from '../app/redux/detailescardSlice';
import useLivres from "../app/data/database";
import BookCard from "../components/home/bookcard";
import '../css/history.css'
import axios from "../api/axios";
import useTelecharger from "../app/data/telechargerData";
import useAcheter from "../app/data/acheterData";
import { useDispatch } from 'react-redux'
export default function History(){
    const dispatch = useDispatch() 
    const [userEmprunts,setUserEmprunts] = useState([])
    const [showAchat,setShowAchet] = useState(false)
    const { lireShow ,fetchShowlivres } = useShowlivres();
    const { telechar,fetchTelecharger } = useTelecharger()
    const { achater,fetchAchater,updateAcheter } = useAcheter()
    const {livres} = useLivres() 
    const ok = JSON.parse(localStorage.getItem('ok')) || null
    const iduser =  ok?JSON.parse(localStorage.getItem('user')).id:null

    const idlireShow =  lireShow.map((show)=> show.user_id === iduser?show.livre_id:false)
    const idlireShowBooks = livres.filter((livre) => idlireShow.includes(livre.id));

    const newemprunt = userEmprunts.map((emprunt)=> emprunt.user_id === iduser?emprunt.livre_id:false) 
    const idnewemprunt = livres.filter((livre) => newemprunt.includes(livre.id));

    const newtelechar = telechar.map((telech)=> telech.user_id === iduser?telech.livre_id:false)
    const idtelechargements = livres.filter((livre) => newtelechar.includes(livre.id));
    
    const newachater = achater.filter(a => a.user_id === iduser).map(a => {
    const livre = livres.find(l => l.id === a.livre_id);
    return {...a,livre};});
    
    // const idachaters = newachater.map(a => a.livre);
    
    useEffect(()=>{
        fetchShowlivres()
    },[])
    useEffect(()=>{
        const fetchEmprunts = async () => {
            try {
                const res = await axios.get("/emprunts");
                // console.log("Emprunts fetched successfully", res.data);
                setUserEmprunts(res.data)
            } catch (err) {
                console.log("Error fetching emprunts", err.response?.data);
            }
        }
        fetchEmprunts()
    },[])
    useEffect(()=>{
        fetchTelecharger()
    },[])
    useEffect(()=>{
        fetchAchater()
    },[])
    
    const [newnhostoy,setNewnhostoy] = useState([])
    const [activeTab,setActiveTab] = useState('lectures')
    const  history = [
        { label:  'Mes lectures', key: 'lectures', action: () => {setNewnhostoy([...idlireShowBooks]);setShowAchet(false); setActiveTab('lectures')} },
        { label:  'Mes téléchargements', key: 'telechargements', action: () => {setNewnhostoy([...idtelechargements]);setShowAchet(false); setActiveTab('telechargements')} },
        { label:  'Mes achats', key: 'achats', action: () =>{ setNewnhostoy([...newachater]);setShowAchet(true); setActiveTab('achats')} },
        { label:  'Mes emprunts', key: 'emprunts', action: () =>  {setNewnhostoy([...idnewemprunt]);setShowAchet(false); setActiveTab('emprunts')} },

    ]
    useEffect(()=>{
    if (!showAchat && newnhostoy.length === 0) {
        setNewnhostoy([...idlireShowBooks]);
    }
    },[idlireShowBooks])
     return(
        <div className="cards-f">
            <div style={{marginTop:'50px',marginBottom:'50px'}} className='cards-h'>
                <h3>Historique</h3>
                <ul>
                    {history.map((h)=>
                    <li  
                    // className={activeTab === h.key ? 'active-history' : ''}
                    style={{color: activeTab === h.key ? '#58997b' : ''}}
                     key={h.label} onClick={()=>{ h.action()}}>{h.label}</li>)}
                </ul>

                {newnhostoy.length > 0 ?
                <div className='cards'>
                    {newnhostoy.map((b)=> {

                        return( <div className={showAchat?'cards-achat':''}>
                         <BookCard  key={b.id} book={b.livre || b}/>
                          {showAchat && (
                            <div>
                            <h3>{b.status}</h3>
                            <p>{b.status_paye}</p>
                            </div>
                          )}
                        </div>
                   )})}
                    
                </div>:<span style={{color:'gray',padding:'129px 0',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>Aucun livre</span>}
            </div>
        </div>
    );
}   