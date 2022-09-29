import { useState } from "react";
import "./style.css";
import { firestore } from "./firebase/config";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  async function handleAdd() {
    await firestore
      .collection("posts")
      .add({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        console.log("cadastrado com sucesso");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function buscaPost() {
    await firestore
      .collection("posts")
      .doc("1234")
      .get()
      .then((snapshot) => {
        setTitulo(snapshot.data().titulo);
        setAutor(snapshot.data().autor);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>test</h1>

      <label>Titulo</label>
      <textarea
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <label>Autor</label>
      <input
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />

      <button onClick={handleAdd}>Cadastrar</button>
      <button onClick={buscaPost}>Buscar Post</button>
    </div>
  );
}

export default App;
