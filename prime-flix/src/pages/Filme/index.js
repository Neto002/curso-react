import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./style.css";

export default function Filme() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [requestFilme, setRequestFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFilme() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "8722a889e8aa183266cfc4a9386ffa0e",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setRequestFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("filme n encontrado");
          navigate("/", { replace: true });
        });
    }

    getFilme();

    return () => {
      console.log("desmontado");
    };
  }, [id, navigate]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === requestFilme.id)

    if (hasFilme) {
      toast.warn("Filme já adicionado à sua lista")
      return;
    }

    filmesSalvos.push(requestFilme)
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))

    toast.success("Filme salvo com sucesso!")
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes..</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{requestFilme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${requestFilme.backdrop_path}`}
        alt={requestFilme.title}
      />

      <h3>Sinopse</h3>
      <span>{requestFilme.overview}</span>
      <strong>Avaliação: {requestFilme.vote_average}/10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a href={`https://www.youtube.com/results?search_query=${requestFilme.title} Trailer`} target="blank" rel="noreferrer">
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
