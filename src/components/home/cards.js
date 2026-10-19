import '../../css/cards.css'
import { useSelector, useDispatch } from 'react-redux'
import BookCard from './bookcard'
import { setNextNew, setBackNew, setBackShow, setNextShow } from '../../app/redux/cardsSlice'
import useLivres from '../../app/data/database'
 
export default function Cards() {
    const cards = useSelector((state) => state.cards)
    const dispatch = useDispatch()
    useLivres()  
    const books = [...cards.cards]
     

    const newBooks = books
        .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
        .slice(cards.new, cards.new + 10)
    const ShowBooks = books
        .sort((a, b) => a.showLiver - b.showLiver)
        .slice(cards.show, cards.show + 10)

    const getTitle = () => {
        if (cards.showSearch) return 'Résultats de recherche'
        if (cards.hidCard) return 'Nouveaux livres'
        return `Catégorie : ${cards.onecat}`
    }

    if (books.length === 0) {
        return <p className="loading">Aucun livre trouvé</p>
    }

    return (
        <div className="cards-f">
            {/* Section principale */}
            <div id="Catégorie" >
            <div className="cards-h" id="Nouveaux-livres">
                <h3>{getTitle()}</h3>
                <div className="cards"  >
                    {newBooks.length > 0 ? (
                        newBooks.map((b) => <BookCard key={b.id} book={b} />)
                    ) : (
                        <p   className="empty-msg">Livre introuvable</p>
                    )}
                </div>
                <div className="Next-Back">
                    {cards.new > 0 && (
                        <button onClick={() => dispatch(setBackNew())}>
                            ← Précédent
                        </button>
                    )}
                    {cards.new + 10 < books.length && (
                        <button onClick={() => dispatch(setNextNew())}>
                            Suivant →
                        </button>
                    )}
                </div>
            </div>
            </div>
            {/* Section livres consultés (visible uniquement sur Home) */}
            {cards.hidCard && (
                <div className="cards-h" id="Livres-les-plus-consultés" >
                    <h3>Livres les plus consultés</h3>
                    <div className="cards">
                        {ShowBooks.length > 0 ? (
                            ShowBooks.map((b) => <BookCard key={b.id} book={b} />)
                        ) : (
                            <p className="empty-msg">Livre introuvable</p>
                        )}
                    </div>
                    <div className="Next-Back">
                        {cards.show > 0 && (
                            <button onClick={() => dispatch(setBackShow())}>
                                ← Précédent
                            </button>
                        )}
                        {cards.show + 10 < books.length && (
                            <button onClick={() => dispatch(setNextShow())}>
                                Suivant →
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}