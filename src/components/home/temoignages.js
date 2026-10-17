import '../../css/temoignages.css'

export default function Temoignages() {
  const reviews = [
    { id: 1, user: "Jean Dupont", role: "Lecteur", text: "Une plateforme incroyable pour les livres. La navigation est fluide.", rating: 5 },
    { id: 2, user: "Marie Curie", role: "Étudiante", text: "Livraison rapide et emballage soigné. Merci !", rating: 5 },
    { id: 3, user: "Pierre Martin", role: "Entrepreneur", text: "Les livres de business sont excellents.", rating: 4 },
  ];

  return (
    <section className="testimonials-section" id="Ce-qu'ils-disent">
      <div className="container-testimonials">
        <h2 className="test-title">Ce qu'ils disent</h2>
        <div className="test-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="test-card">
              <div className="test-header">
                <div className="stars">{"★".repeat(rev.rating)}</div>
                <span className="verified">✔ Vérifié</span>
              </div>
              <p>"{rev.text}"</p>
              <div className="user-info">
                <strong>{rev.user}</strong>
                <span>{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}