// Criando componentes
/* import React, { Component } from "react";

 class Equipe extends Component {
  render() {
    return (
      <div>
        <Sobre
          nome={this.props.nome}
          cargo={this.props.cargo}
          idade={this.props.idade}
        />
        <Social fb={this.props.facebook} />
        <hr />
      </div>
    );
  }
}

class Sobre extends Component {
  render() {
    return (
      <div>
        <h2> Olá sou o {this.props.nome} </h2>
        <h2> Sou {this.props.cargo} </h2>
        <h2> Tenho {this.props.idade} anos </h2>
      </div>
    );
  }
}

const Social = (props) => {
  return (
    <div>
      <ul>
        <li>
          <a href={props.fb} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </li>
        <li>
          <a href={props.fb} target="_blank" rel="noreferrer">
            Linkedin
          </a>
        </li>
        <li>
          <a href={props.fb} target="_blank" rel="noreferrer">
            Youtube
          </a>
        </li>
      </ul>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h1>Conheça nossa equipe</h1>
      <Equipe
        nome="Neto"
        cargo="Dev"
        idade="20"
        facebook="https://www.google.com"
      />
    </div>
  );
} */

// Trabalhando com State
/* import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "Neto",
      contador: 0,
    };
    this.aumentar = this.aumentar.bind(this);
    this.diminuir = this.diminuir.bind(this);
  }

  aumentar() {
    let state = this.state;
    state.contador++;
    this.setState(state);
  }

  diminuir() {
    let state = this.state;
    if (this.state.contador > 0) {
      state.contador--;
      this.setState(state);
    } else {
      alert("Contador igual a 0");
    }
  }

  render() {
    return (
      <div>
        <h1>Contador</h1>
        <h3>
          <button onClick={this.diminuir}>-</button>
          {this.state.contador}
          <button onClick={this.aumentar}>+</button>
        </h3>
      </div>
    );
  }
} */

// Ciclo de Vida
/* 
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hora: '00:00:00'
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ hora: new Date().toLocaleTimeString() })
    }, 1000);
  }

  componentDidUpdate() {
    console.log('atualizou');
  }

  render() {
    return (
      <div>
        <h1> Meu Projeto {this.state.hora} </h1>
      </div>
    );
  }
}
 */

// Criando componente em arquivo separado

/* import React, { Component } from "react";
import Membro from "./components/membro";

export default class App extends Component {
  render() {
    return (
      <div>
        <Membro nome="Visitante" />
      </div>
    );
  }
} */

// Condicional dentro do html

/* import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
    };
    this.entrar = this.entrar.bind(this);
    this.sair = this.sair.bind(this);
  }

  entrar() {
    this.setState({ status: true });
  }

  sair() {
    this.setState({ status: false });
  }

  render() {
    return (
      <div>
        { //this.state.status === 1 &&
          //<h1>Bem vindo ao sistema!</h1>
        }

        {this.state.status ? (
          <div>
            <h2>Bem vindo ao sistema</h2>
            <button onClick={this.sair}>Sair</button>
          </div>
        ) : (
          <div>
            <h2>Olá visitante, faça o login</h2>
            <button onClick={this.entrar}>Entrar</button>
          </div>
        )}
      </div>
    );
  }
} */

// Listas

/* import React, { Component } from "react";
import Feed from "./components/feed";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [
        { id: 1, username: "Neto", curtidas: 10, comentarios: 2 },
        { id: 2, username: "João", curtidas: 120, comentarios: 24 },
        { id: 3, username: "Maria", curtidas: 30, comentarios: 12 },
        { id: 4, username: "Ricardo", curtidas: 1, comentarios: 0 },
      ],
    };
  }

  render() {
    return (
      <div>
        {this.state.feed.map((item) => {
          return <Feed id={item.id} username={item.username} curtidas={item.curtidas} comentarios={item.comentarios} />;
        })}
      </div>
    );
  }
} */

// Formulários

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nome: "",
        email: "",
        senha: "",
        sexo: ""
      }
    };
    this.atualizaDados = this.atualizaDados.bind(this);
  }

  atualizaDados(e) {
    let form = this.state.form;
    form[e.target.name] = e.target.value;

    this.setState({form: form})
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        Nome:
        <input type="text" name="nome" value={this.state.form.nome} onChange={this.atualizaDados} placeholder="digite seu nome" />
        <br />

        Email:
        <input type="email" name="email" value={this.state.form.email} onChange={this.atualizaDados} placeholder="digite seu email"/>
        <br />

        Senha:
        <input type="password" name="senha" value={this.state.form.senha} onChange={this.atualizaDados} placeholder="digite sua senha"
        />
        <br/>

        Sexo:
        <select name="sexo" value={this.state.form.sexo} onChange={this.atualizaDados}>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>

        <div>
          <h3> { this.state.form.nome } </h3>
          <h3> { this.state.form.email } </h3>
          <h3> { this.state.form.senha } </h3>
          <h3> { this.state.form.sexo } </h3>
        </div>
      </div>
    );
  }
}

// Praticando Formulários

/* import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      senha: "",
      error: ""
    };
    this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar(e) {
    const {nome, email, senha} = this.state;

    if (nome && email && senha) {
      alert(`Nome: ${nome}\nE-mail: ${email}\nSenha: ${senha}`)
    } else {
      this.setState({error: 'Preencha todos os campos'})
    }

    e.preventDefault()
  }

  render() {
    return (
      <div>
        <h1>Novo usuário</h1>
        {
          this.state.error && <p> {this.state.error} </p>
        }
        <form onSubmit={this.cadastrar}>
          <div>
            <label>Nome: </label>
            <input
              type="text"
              value={this.state.nome}
              onChange={(e) => this.setState({ nome: e.target.value })}
            />
          </div>
          <br />

          <div>
            <label>E-mail:</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <br />

          <div>
            <label>Senha: </label>
            <input
              type="password"
              value={this.state.senha}
              onChange={(e) => this.setState({ senha: e.target.value })}
            />
          </div>
          <br />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
} */
