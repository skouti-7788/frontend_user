import '../../css/imageBox.css'
import { useDispatch, useSelector } from 'react-redux'
import { Filter, AllBooks, SearshBar, sethidCard, setshowSearch } from '../../app/redux/cardsSlice'
import StyleImage from './styleimage'
import StatsBar from './statsBar'
export default function ImageBox() {
    const searsh = useSelector((state) => state.cards)
    const dispatch = useDispatch()
    const category = searsh.livres.map((livre) => livre.category)
    // console.log(category)

    const categories = [
        { label: 'Livres', action: () => { dispatch(AllBooks()); dispatch(sethidCard(true)); dispatch(setshowSearch(false)) } },
        { label: category[0], action: () => { dispatch(Filter(category[0])); dispatch(sethidCard(false)); dispatch(setshowSearch(false)) } },
        { label: category[1], action: () => { dispatch(Filter(category[1])); dispatch(sethidCard(false)); dispatch(setshowSearch(false)) } },
        { label: category[2], action: () => { dispatch(Filter(category[2])); dispatch(sethidCard(false)); dispatch(setshowSearch(false)) } },
        { label: category[3], action: () => { dispatch(Filter(category[3])); dispatch(sethidCard(false)); dispatch(setshowSearch(false)) } },
        { label: category[4], action: () => { dispatch(Filter(category[4])); dispatch(sethidCard(false)); dispatch(setshowSearch(false)) } },
        { label: category[5], action: () => { dispatch(Filter(category[5])); dispatch(sethidCard(false)); dispatch(setshowSearch(false)) } },

    ]

    return (
        <div>
            <StyleImage />
            <StatsBar/>
            <div className="image-bg" id="Recherche">
                <div className="image-box">
                    <div className="cont-searsh">
                        <h3>Bibliothèque Kitab</h3>
                        <h4 className="h4">Trouvez votre prochain livre en un instant</h4>
                        <input
                            type="text"
                            placeholder="Rechercher un livre..."
                            value={searsh.searsh}
                            onChange={(e) => {
                                dispatch(SearshBar(e.target.value))
                                dispatch(sethidCard(false))
                                dispatch(setshowSearch(true))
                            }}
                        />
                    </div>

                    <div className="cont-books">
                        <h4>Catégorie de livres la plus consultée</h4>
                        <ul>
                            {categories.map((cat) => (
                                <a href="#Catégorie" style={{textDecoration:"none"}}><li key={cat.label} onClick={cat.action}>
                                    {cat.label}
                                </li></a>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}