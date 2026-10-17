import { useDispatch, useSelector } from "react-redux"
import { Show, Hide, setOk, clearMessage, setemailErr, setpasswordErr, setconfPassword, clearMessageErr } from "../../app/redux/logSlice"
import { setShowFavorite } from '../../app/redux/detailescardSlice'
import { useState, useEffect } from "react"
import { useLog } from "../../app/data/logData"
import '../../css/signIn.css'
 
export default function SignIn() {
    const { addUsers, verUser } = useLog()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const [veruser, setVeruser] = useState({
        email: '',
        password: '',
    })
    
    // State bdl alert()
    const [uiFeedback, setUiFeedback] = useState({ type: '', text: '' })

    const show = useSelector((state) => state.loguser)
    const dispatch = useDispatch()
    
    // show.hide = true y3ni Inscription
    const isSignUp = show.hide
    
    useEffect(() => {
        if (!show.message) return
        
        switch (show.message) {
            case "User existe deja":
                setUiFeedback({ type: 'error', text: "Cet email est déjà utilisé." })
                dispatch(clearMessage())
                dispatch(Hide(true))
                break
            case "Utilisateur créé avec succès":
                setUiFeedback({ type: 'success', text: "Compte créé avec succès ! Connectez-vous." })
                dispatch(clearMessage())
                setUser({ username: '', email: '', password: '', password_confirmation: '' })
                dispatch(Hide(false)) // Switch vers Sign In
                break
            case "Login success":
                setUiFeedback({ type: 'success', text: "Connexion réussie !" })
                dispatch(Show(false))
                dispatch(setOk(true))
                dispatch(clearMessage())
                localStorage.setItem("ok", true)
                setVeruser({ email: '', password: '' })
                dispatch(clearMessageErr())
                break
            case "User not found":
                setUiFeedback({ type: 'error', text: "Aucun compte trouvé avec cet email." })
                dispatch(clearMessage())
                break
            case "Password incorrect":
                setUiFeedback({ type: 'error', text: "Mot de passe incorrect." })
                dispatch(clearMessage())
                break
            case "Les champs sont vides":
                setUiFeedback({ type: 'error', text: "Veuillez remplir tous les champs." })
                dispatch(clearMessage())
                break
        
            default:
                dispatch(clearMessage())
        }
    }, [show.message, dispatch])

    const Validation = () => {
        const currentData = isSignUp ? user : veruser
        
        const isEmpty = Object.values(currentData).some(v => v.trim() === '')

        if (isEmpty) {
            setUiFeedback({ type: 'error', text: 'Veuillez remplir tous les champs.' })
            return
        }

        setUiFeedback({ type: '', text: '' })
        dispatch(clearMessageErr())

        const valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentData.email)
        if (!valEmail) {
            dispatch(setemailErr('Format email invalide'))
            return
        }
        dispatch(setemailErr(''))

        const valPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(currentData.password)
        if (!valPassword) {
            dispatch(setpasswordErr('Min 8 lettres, majuscule, minuscule, chiffre et symbole'))
            return
        }
        dispatch(setpasswordErr(''))

        if (isSignUp) {
            if (user.password !== user.password_confirmation) {
                dispatch(setconfPassword('Les mots de passe ne correspondent pas'))
                return
            }
            dispatch(setconfPassword(''))
            addUsers(user)

        } else {
            verUser(veruser)
        }
    }

    const handleClose = () => {
        dispatch(Show(false))
        dispatch(setShowFavorite(false))
        setUiFeedback({ type: '', text: '' })
        dispatch(clearMessageErr())
    }

    return (
        <>
            {show.show && (
                <div className="sign-overlay" onClick={handleClose}>
                    <div className="sign-modal" onClick={(e) => e.stopPropagation()}>
                        
                        <button className="sign-close" onClick={handleClose}>✕</button>
                        
                        <h3 className="sign-title">
                            {isSignUp ? 'Créer un compte' : 'Se connecter'}
                        </h3>

                        {uiFeedback.text && (
                            <div className={`sign-feedback ${uiFeedback.type}`}>
                                {uiFeedback.text}
                            </div>
                        )}

                        <div className="sign-form">
                            {isSignUp && (
                                <div className="input-group">
                                    <label>Nom d'utilisateur</label>
                                    <input 
                                        type='text' 
                                        placeholder="John Doe"
                                        value={user.username} 
                                        onChange={(e) => setUser({...user, username: e.target.value})} 
                                    />
                                </div>
                            )}

                            <div className="input-group">
                                <label>Email</label>
                                <input 
                                    type='email' 
                                    placeholder="exemple@email.com"
                                    value={isSignUp ? user.email : veruser.email} 
                                    onChange={(e) => isSignUp 
                                        ? setUser({...user, email: e.target.value}) 
                                        : setVeruser({...veruser, email: e.target.value})
                                    } 
                                />
                                {show.emailErr && <span className="error-text">{show.emailErr}</span>}
                            </div>

                            <div className="input-group">
                                <label>Mot de passe</label>
                                <input 
                                    type='password' 
                                    placeholder="••••••••"
                                    value={isSignUp ? user.password : veruser.password} 
                                    onChange={(e) => isSignUp 
                                        ? setUser({...user, password: e.target.value}) 
                                        : setVeruser({...veruser, password: e.target.value})
                                    } 
                                />
                                {show.passwordErr && <span className="error-text">{show.passwordErr}</span>}
                            </div>

                            {isSignUp && (
                                <div className="input-group">
                                    <label>Confirmer le mot de passe</label>
                                    <input 
                                        type='password' 
                                        placeholder="••••••••"
                                        value={user.password_confirmation} 
                                        onChange={(e) => setUser({...user, password_confirmation: e.target.value})} 
                                    />
                                    {show.confPassword && <span className="error-text">{show.confPassword}</span>}
                                </div>
                            )}

                            <button className="sign-btn" onClick={Validation}>
                                {isSignUp ? "Créer mon compte" : "Se connecter"}
                            </button>

                            <p className="sign-switch">
                                {isSignUp ? 'Déjà un compte ?' : 'Pas de compte ?'}
                                <span onClick={() => { 
                                    dispatch(Hide(!isSignUp)); 
                                    dispatch(clearMessageErr()); 
                                    setUiFeedback({ type: '', text: '' }) 
                                }}>
                                    {isSignUp ? ' Se connecter' : " S'inscrire"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}