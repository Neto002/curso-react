import { useEffect, useState } from "react";
import "./style.css";
import { firestore, auth } from "./firebase/config";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [user, setUser] = useState(false);
  const [userLogged, setUserLogged] = useState({});

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

  useEffect(() => {
    async function checkLogin() {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(true);
          setUserLogged({
            uid: user.uid,
            email: user.email,
          });
        } else {
          setUser(false);
          setUserLogged({});
        }
      });
    }
    checkLogin();
  }, []);

  async function cadastrarUsuario() {
    await auth
      .createUserWithEmailAndPassword(email, senha)
      .then((value) => {
        console.log(value);
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Senha muito fraca...");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email já existe");
        } else if (error.code === "auth/invalid-email") {
          alert("Email inválido");
        }
      });
  }

  async function login() {
    await auth.signInWithEmailAndPassword(email, senha).then((value) => {
      console.log(value.user);
    }).catch((error) => {
      console.log(error);
    });
  }

  async function logout() {
    await auth.signOut();
  }

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

  async function excluiPost(id) {
    firestore
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        alert(`post com id ${id} excluído`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Login</h1>

      {user && (
        <div>
          <strong>usuario logado</strong>
          <br/>
          <span>{userLogged.uid} - {userLogged.email}</span>
          <br/><br/>
        </div>
      )}

      <div className="container">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <button onClick={login}>Fazer Login</button>
        <button onClick={cadastrarUsuario}>Cadastro</button>
        <button onClick={logout}>Logout</button>
        <br />
      </div>
      <hr />

      <div className="container">
        <h1>Banco de dados</h1>
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
                <button onClick={() => excluiPost(post.id)}>
                  Excluir post
                </button>
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
