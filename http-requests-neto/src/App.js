import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [retorno, setRetorno] = useState([]);

  useEffect(() => {
    function loadAPI() {
      let url = "https://sujeitoprogramador.com/rn-api/?api=posts";

      fetch(url)
        .then((r) => r.json())
        .then((json) => {
          setRetorno(json);
        });
    }

    loadAPI();
  }, []);

  return (
    <div className="container">
      <header>
        <strong>React API</strong>
      </header>

      {retorno.map((item) => {
        return (
          <article className="post" key={item.id}>
            <strong className="titulo">{item.titulo}</strong>
            <img className="capa" src={item.capa} alt={item.titulo} />
            <p className="subtitulo">{item.subtitulo}</p>
            <a className="botao">Acessar</a>
          </article>
        );
      })}
    </div>
  );
}

export default App;
