import { useState } from "react";
import "./signin.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitForm(e) {
    e.preventDefault();
    alert('a')
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="logo" />
        </div>

        <form onSubmit={submitForm}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Acessar</button>
        </form>

        <Link to="/register">Criar uma Conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
