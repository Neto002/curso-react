import { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import avatar from "../../assets/avatar.png";
import firebase from "../../firebase/config";
import "./profile.css";

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarURL, setAvatarURL] = useState(user && user.avatarURL);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarURL(URL.createObjectURL(e.target.files[0]));
      } else {
        alert("Imagem inválida");
        setImageAvatar(null);
        return null;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;

    const uploadTask = await firebase
      .storage()
      .ref(`images/${currentUid}/${imageAvatar.name}`)
      .put(imageAvatar)
      .then(async () => {
        console.log("foto enviada com sucesso");

        await firebase
          .storage()
          .ref(`images/${currentUid}`)
          .child(imageAvatar.name)
          .getDownloadURL()
          .then(async (url) => {
            await firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                avatarURL: url,
                nome: nome,
              })
              .then(() => {
                let data = {
                  ...user,
                  avatarURL: url,
                  nome: nome,
                };

                setUser(data);
                storageUser(data);
              });
          });
      });
  }

  async function handleSave(e) {
    e.preventDefault();

    if (imageAvatar === null && nome !== "") {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({ nome: nome })
        .then(() => {
          let data = {
            ...user,
            nome: nome,
          };
          setUser(data);
          storageUser(data);
        });
    } else if (nome !== "" && imageAvatar !== null) {
      handleUpload();
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu perfil">
          <FiSettings color="black" size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="white" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              {avatarURL === null ? (
                <img
                  src={avatar}
                  width="250"
                  height="250"
                  alt="Perfil do usuário"
                />
              ) : (
                <img
                  src={avatarURL}
                  width="250"
                  height="250"
                  alt="Perfil do usuário"
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Email</label>
            <input type="text" value={email} disabled />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => signOut()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
