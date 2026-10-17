import '../../css/auteurspopulaires.css'
import Victor_Hugo from '../../images/Victor-Hugo.webp'
import Emile_Zola from '../../images/émile-zola.webp'
import Marcel_Proust from '../../images/marcel-proust.webp'
import Jules_Verne from '../../images/jules-verne.webp'
export default function AuteursPopulaires() {
  const authors = [
    { id: 1, name: "Victor Hugo", image: Victor_Hugo, role: "Romancier" },
    { id: 2, name: "Émile Zola", image: Emile_Zola, role: "Écrivain" },
    { id: 3, name: "Marcel Proust", image: Marcel_Proust, role: "Romancier" },
    { id: 4, name: "Jules Verne", image: Jules_Verne, role: "Aventurier" },
  ];

  return (
    <section className="authors-section" id="Auteurs-Populaires">
      <div className="container-authors">
        <h2 className="authors-title">Auteurs Populaires</h2>
        <div className="authors-grid">
          {authors.map((author) => (
            <div key={author.id} className="author-card">
              <div className="author-img-container">
                <img src={author.image} alt={author.name} />
              </div>
              <h3>{author.name}</h3>
              <p className="author-role">{author.role}</p>
              <button className="btn-follow">Suivre</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}