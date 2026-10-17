import '../../css/catigorymem.css'
 
export default function CategoryMem({ oneCard,allLivres }) {
    const similar = allLivres.filter(
        (livre) =>
            livre.category === oneCard.category &&
            livre.id !== oneCard.id
    )
    console.log(allLivres);
    if (similar.length === 0) return null
    
    return (
        <div className="category-mem">
            <h4 className="category-mem-title">
                Livres similaires
            </h4>
            <div className="category-mem-list">
                {similar.map((livre) => (
                    <div key={livre.id} className="category-mem-card">
                        <img
                            src={livre.image || '/placeholder.jpg'}
                            alt={livre.title}
                            className="category-mem-img"
                        />
                        <div className="category-mem-info">
                            <p className="category-mem-name">{livre.title}</p>
                            <span className="category-mem-cat">{livre.category}</span>
                            {/* <span className="category-mem-cat">{disc}</span> */}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}