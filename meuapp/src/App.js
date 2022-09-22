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
