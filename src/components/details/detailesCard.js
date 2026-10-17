import '../../css/detailescard.css'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { setShowrate, clearIsShowLivre, clearIsRate, setShowOpinion,
       clearIsOpinion, setShowShare } from '../../app/redux/detailescardSlice'
import opinion from '../../images/opinion.png'
import favorite1 from '../../images/favorite1.png'
import favorite2 from '../../images/favorite2.png'
import rate from '../../images/rate.png'
import share from '../../images/share.png'
import stars from '../../images/star.png'
import CategoryMem from './catigoryMem'
import { Show } from '../../app/redux/logSlice'
import AchCard from './achCard'
import useLivres from '../../app/data/database'
import {  useEffect,useMemo, useState } from 'react'
import { useFavorite } from '../../app/data/favoriteData'
import { useShowlivres } from '../../app/data/showlivresData' 
import api from '../../api/axios'
import useOpinion from '../../app/data/opinionDada'
 

export default function DetailesCard() {
    const [star, setStar] = useState(false)
    const { fetchLivres } = useLivres()
    const { addOpinion, fetchOpinion } = useOpinion();
    const dispatch = useDispatch()
    const cards = useSelector((state) => state.cards)
    const detailescard = useSelector((state) => state.detailescard)
    const ok = useSelector((state) => state.loguser)
    const profile = useSelector((state) => state.profile)
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const { id } = useParams()
    const oneCard = useMemo(
    () => cards.livres.find((c) => c.id === Number(id)) || {},
    [cards.livres, id]
    )
    const { checkFavorite, toggleFavorite, isFavorite } = useFavorite()
    const { addShowlivres } = useShowlivres()
    const [descriptions,setDescriptions] = useState([])

     // console.log(oneCard.image)
    // 1. Gérer les vues (MUSI ÊTRE DANS USEEFFECT)
    useEffect(() => {
        if (user.id && id && profile.lire && ok.ok) {
            addShowlivres(user.id, id)
        }
    }, [user.id, id, profile.lire, ok.ok, addShowlivres])

    // 2. Checker le favori (MUSI ÊTRE DANS USEEFFECT)
    useEffect(() => {
        if (user.id && id && ok.ok) {
            checkFavorite(user.id, id)
        }
    }, [user.id, id, ok.ok, checkFavorite])

    // 3. Réinitialiser après Rate/Show (MUSI ÊTRE DANS USEEFFECT)
    useEffect(() => {
        if (!detailescard.isRate && !detailescard.isShowLivre) {
            return
        }

        fetchLivres()
        dispatch(clearIsRate())
        dispatch(clearIsShowLivre())

        setStar(true)

        const timer = setTimeout(() => {
            setStar(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [
        detailescard.isRate,
        detailescard.isShowLivre,
        dispatch,
        fetchLivres
    ])
   
    useEffect(() => {
        if (!detailescard.emprunter || !oneCard.id || !user.id) {
            return
        }

        const envoyerEmprunt = async () => {
            try {
                await api.post('/emprunts', {
                    livre: oneCard.title,
                    livre_id: oneCard.id,
                    user_id: Number(user.id),
                    date_emprunt: new Date().toISOString().slice(0, 10),
                    date_retour_prevue: detailescard.emprunter
                })
            } catch (err) {
                console.error('Erreur lors de l’emprunt :', err)
            }
        }

        envoyerEmprunt()
    }, [
        detailescard.emprunter,
        oneCard.id,
        oneCard.title,
        user.id
    ])
    if(detailescard.isOpinion && ok.ok){
        addOpinion(id,oneCard.id,detailescard.isOpinion)
     
        dispatch(clearIsOpinion())
    }
    useEffect(() => {
        if (oneCard.id) {
            fetchOpinion(oneCard.id)
        }
    }, [oneCard.id, fetchOpinion])
    const opinions = detailescard.opinions.filter((o)=> o.livre_id === oneCard.id)

    //  console.log(oneCard.id,detailescard.isOpinion)
    const detailsData = [
        { label: 'Catégorie', value: oneCard.category },
        { label: 'Consultations', value: oneCard.showLiver },
        { label: 'Pages', value: oneCard.pages },
        { label: 'Taille', value: oneCard.fileSize },
        { label: 'Format', value: oneCard.extension },
        { label: 'Rang', value: oneCard.book_rank, isRank: true },
        { label: 'Prix', value: `${oneCard.prix} DH` },
        
    ]
    useEffect(() =>  {
        const fetchDscripton = async ()=>{
        if(oneCard.id){
        try{
            const  res = await  api.get(`/livres/${oneCard.id}/description`)
            setDescriptions(res.data.description)
            // console.log('res.data',res.data.description)
         }catch(err){
            console.log(err)
        }}
        }
         fetchDscripton()
    },[oneCard])
    const [showPaye, setShowPaye] = useState(false) 

    return (
         <>
        <div className={!showPaye ? "details-wrapper" : ""}>
            {!showPaye&&<div><div className="detailes">
                <div className='img-container'>
                    <img src={oneCard.image} alt={oneCard.title} /> 
                </div>
                
                <div className='info'>
                    <h3>{oneCard.title}</h3>
                    <p className='author'>{oneCard.author}</p>
                    
                    <div className='info-grid'>
                        {detailsData.map((item, index) => (
                            <div key={index} className='info-row'>
                                <span className='info-label'>{item.label}</span>
                                <span className='info-value'>
                                    {item.isRank && <img className={`rank-star ${star ? 'star-animate' : ''}`} src={stars} alt='star' />}
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                   
                    <div className='btn-book'>
                        <button onClick={() => dispatch(setShowrate({ title: oneCard.title, showrate: true, id: oneCard.id }))}>
                            <img src={rate} alt='rate' /> <span>Rate</span>
                        </button>
                        <button onClick={() => ok.ok ? toggleFavorite(user.id, id) : dispatch(Show(true))}>
                            <img src={isFavorite ? favorite1 : favorite2} alt='favorie' /> <span>Favorite</span>
                        </button>
                        <button onClick={() => dispatch(setShowOpinion(true))}>
                            <img src={opinion} alt='opinion' /> <span>Opinions</span>
                        </button>
                        <button onClick={() => dispatch(setShowShare(true))}>
                            <img src={share} alt='share' /> <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className='discrip'>
                <h4>Description</h4>
                <p>{descriptions}</p>
            </div> </div>}
            <AchCard bookData={oneCard} showPaye={showPaye} setShowPaye={setShowPaye}is_free={oneCard.is_free} bookId={oneCard.id} download_link={oneCard.download_link}  book={oneCard.title} file_url={oneCard.pdf_url} />

            {!showPaye&& <CategoryMem  oneCard={oneCard} allLivres={cards.livres}/>}
            {!showPaye&& <div>
            {opinions?.length > 0&&
             (<div className='opinions'>
                    <h4>Opinions</h4>
                    <div className="opinions-list">
                        {opinions?.map((op) => (
                            <div key={op.id} className='opinion'>
                                <div className='user'>
                                    <img 
                                        src={op.user?.image || `https://ui-avatars.com/api/?name=${op.user?.username}&background=random`} 
                                        alt={op.user?.username} 
                                    />   
                                    <span>{op.user?.username}</span> 
                                </div>
                                <p>{op.opinion}</p> 
                            </div>
                        ))}
                    </div>
                </div>
            )}</div>}
        </div>

    </>
    )
}