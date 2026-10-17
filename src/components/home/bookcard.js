 
import { useNavigate } from "react-router";
export default function BookCard({book}) {
    // const { fetchFavorite  } = useFavorite();
    // const { fetchShowlivres}  = useShowlivres();
    // useEffect(() => {
    //     fetchFavorite();
    //     fetchShowlivres();
    // }, [])
    const navigaie = useNavigate()
    return (
        <div className='card'>
            <img
                src={book.image}
                // src={cover}
                alt={book.title}
                // onError={(e) => {
                //     e.target.onerror = null;
                //     e.target.src = `https://placehold.co/200x300/1a472a/ffffff?text=${encodeURIComponent(book.title)}`;
                // }}
            />
            <button className='detail' onClick={()=>{navigaie(`/detailes/${book.id}`)}}>detailes</button>
        </div>
    );
}