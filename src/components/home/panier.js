import '../../css/panier.css'
import { useDispatch, useSelector } from 'react-redux'
import { Filter, sethidCard } from '../../app/redux/cardsSlice'
import { Show,setMessage, setOk, setClose } from '../../app/redux/logSlice'
import { useNavigate } from 'react-router-dom'
import { setShowProfile } from '../../app/redux/profileSlice'
import api from '../../api/axios'
import ProfileCard from '../profile/profileCard'
import { useEffect,useCallback} from 'react'
import KitabLogo from './KitabLogo';

export default function Panier() {
    const books = useSelector((state) => state.cards)
    const ok = useSelector((state) => state.loguser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const newuser = JSON.parse(localStorage.getItem('user')) || {} 
      
                     
  const logout = useCallback(async () => {
        try {
            await api.put(`/adherents/by-user/${newuser.id}`, {
                user_id: newuser.id,
                nom: newuser.username,
                email: newuser.email,
                phone: '--',
                datadahestion: new Date().toISOString().slice(0, 10),
                status: 'inactive'
            })
        } catch (err) {
            console.error('Erreur lors de la désactivation :', err)
        }

        try {
            const res = await api.post('/logout')

            localStorage.removeItem('ok')
            localStorage.removeItem('token')
            localStorage.removeItem('user')

            dispatch(setOk(false))
            dispatch(setMessage(res.data.message))

            navigate('/')
        } catch (err) {
            console.error('Logout failed:', err.response?.data || err.message)
        }
    }, [newuser.id, newuser.username, newuser.email, dispatch, navigate])

    useEffect(() => {
        if (ok.close) {
            logout()
            dispatch(setClose(null))
        }
    }, [ok.close,logout,dispatch])

    const getUserInitial = () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            return user?.username?.charAt(0).toUpperCase() || '?'
        } catch {
            return '?'
        }
    }

    return (
        <nav className="containre">
            {/* <div className="nav-logo" onClick={() => navigate('/')}>
                <img className="logo-icon" src={k} alt="logo" />
                <span className="logo-text">e</span>
                <img className="logo-title" src={title} alt="books" />
                <span className="logo-text">ab</span>
            </div> */}
            <a href="#accueil"><KitabLogo onClick={() => navigate('/')} /></a>

            <ul className="nav-links">
                <li className="nav-category"> 
                    <select
                        value={books.search}
                        onChange={(e) => {
                            dispatch(Filter(e.target.value))
                            dispatch(sethidCard(false))
                            document.getElementById("Catégorie").scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        <option value="" disabled>Catégorie</option>
                        {[...new Set(books.livres.map((livre) =>livre.category))].map((cat) =>{ 
                            // console.log(cat)
                        return(
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        )})}
                    </select>
                </li>
                <li ><a href="#Recherche">Recherche</a></li>
                <li ><a href="#Nouveaux-livres">Nouveaux livres</a></li>
                <li ><a href="#Livres-les-plus-consultés">Livres les plus consultés</a></li>
                <li ><a href="#Auteurs-Populaires">Auteurs Populaires</a></li>
                <li ><a href="#Ce-qu'ils-disent">Avis Lecteurs</a></li>
            </ul>
            <ProfileCard/>
            <div className="nav-actions">
                {ok.ok && (
                    <button className="Sign-out" onClick={logout}>
                        Sign out
                    </button>
                )}
                {!ok.ok && (
                    <button className="Sign-in" onClick={() => dispatch(Show(true))}>
                        Sign in
                    </button>
                )}
                {ok.ok && (
                    <div
                        className="profile"
                        onClick={() => dispatch(setShowProfile(true))}
                    >
                        {getUserInitial()}
                    </div>
                )}
            </div>
            
        </nav>
    )
}