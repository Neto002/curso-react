import { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import "./profile.css";
import avatar from "../../assets/avatar.png";

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarURL, setAvatarURL] = useState(user && user.avatarURL);

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu perfil">
          <FiSettings color="black" size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="white" size={25} />
              </span>
              <input type="file" accept="image/*" />
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
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Email</label>
            <input type="text" value={email} disabled />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
            <button className="logout-btn" onClick={() => signOut()}>Sair</button>
        </div>
      </div>
    </div>
  );
}
