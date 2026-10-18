import axios from "../../api/axios";
import { useEffect,useCallback} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { setLivres } from "../redux/cardsSlice";

export default function useLivres() {
  const livres = useSelector((state) => state.cards.livres);
  const dispatch = useDispatch();

  const fetchLivres = useCallback(async () => {
    try {
      const res = await axios.get("/livres");

      console.log("Réponse complète API :", res.data);

      const livresData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.livres)
          ? res.data.livres
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

      dispatch(setLivres(livresData));

      console.log("Livres récupérés :", livresData);
    } catch (err) {
      console.error(
        "Erreur récupération livres :",
        err.response?.status,
        err.response?.data || err.message
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchLivres();
  }, [fetchLivres]);

  return { livres, fetchLivres };
}



 


// export const booksDescription = books.map(book => ({
//   ...book,
//   description: descriptions[book.title] || "Description non disponible."
// }));
export const categories = [
  { id: 1, name: "Romans" },
  { id: 2, name: "Histoires" },
  { id: 3, name: "Générale" },
  { id: 4, name: "Éducation" },
  { id: 5, name: "Religion" },
  { id: 6, name: "Histoire" },
  { id: 7, name: "Sciences" },
  { id: 8, name: "Philosophie" },
  { id: 9, name: "Politique" },
  { id: 10, name: "Développement personnel" }
];
export const opinions = [
  {
    id: 1,
    name: "Yassine El Idrissi",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    opinion:
      "Un livre exceptionnel qui m’a captivé dès les premières pages. L’auteur maîtrise parfaitement son récit et parvient à transmettre des émotions profondes sans jamais tomber dans l’exagération. Les personnages sont vivants, crédibles, et leurs conflits intérieurs sont décrits avec une grande finesse. Une lecture que je recommande vivement."
  },

  {
    id: 2,
    name: "Sara Benali",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    opinion:
      "Je ne m’attendais pas à être autant touchée par ce livre. L’écriture est fluide, poétique, et chaque chapitre apporte une nouvelle dimension à l’histoire. L’auteur réussit à aborder des thèmes sensibles avec beaucoup de délicatesse. C’est le genre d’ouvrage qui reste en tête longtemps après l’avoir terminé."
  },

  {
    id: 3,
    name: "Omar El Fassi",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    opinion:
      "Une œuvre remarquable qui allie profondeur et plaisir de lecture. Le style est élégant, les idées sont fortes, et l’intrigue est construite avec intelligence. J’ai particulièrement apprécié la manière dont l’auteur explore la psychologie des personnages. Un livre à ne pas manquer pour les amateurs de littérature sérieuse."
  },

  {
    id: 4,
    name: "Imane Azzouzi",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    opinion:
      "Un récit émouvant et très bien écrit. Certaines phrases m’ont réellement marquée par leur beauté et leur justesse. L’auteur parvient à créer une atmosphère intime qui nous rapproche des personnages et de leurs émotions. Une lecture enrichissante et profondément humaine."
  },

  {
    id: 5,
    name: "Hicham Mouline",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    opinion:
      "Un excellent livre, maîtrisé du début à la fin. L’équilibre entre narration, réflexion et rythme est parfaitement réussi. Chaque chapitre apporte quelque chose de nouveau et pousse le lecteur à aller plus loin. Une œuvre solide qui mérite largement sa place dans toute bonne bibliothèque."
  }
];
