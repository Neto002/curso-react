import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './style.css'

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "PrimeFlix - Neto"
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "8722a889e8aa183266cfc4a9386ffa0e",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (<div className="loading">
        <h2>Carregando filmes...</h2>
    </div>)
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
