import { useEffect, useState } from "react";
import "./style.css";
import { firestore } from "./firebase/config";

function App() {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      await firestore.collection("posts").onSnapshot((doc) => {
        let meusPosts = [];

        doc.forEach((item) => {
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor,
          });
        });

        setPosts(meusPosts);
      });
    }

    loadPosts();
  }, []);

  async function criaPost() {
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

  /* async function buscaPost() {
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
  } */

  async function buscaPosts() {
    await firestore
      .collection("posts")
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch(() => console.log("erro"));
  }

  async function editarPost() {
    await firestore
      .collection("posts")
      .doc(id)
      .update({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        console.log("atualizado com sucesso");
        setId("");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>test</h1>

      <label>Id: </label>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />

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

      <button onClick={criaPost}>Cadastrar</button>
      <button onClick={buscaPosts}>Buscar Posts</button>
      <button onClick={editarPost}>Editar Post</button>
      <br />

      <h2>Posts existentes no banco:</h2>
      <br />
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <span>ID: {post.id}</span>
              <br />
              <span>Titulo: {post.titulo}</span>
              <br />
              <span>Autor: {post.autor}</span>
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
