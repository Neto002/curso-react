import React, { Component } from "react";

export default class Membro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: props.nome,
    };

    this.entrar = this.entrar.bind(this);
    this.sair = this.sair.bind(this);
  }

  entrar() {
    if (this.state.nome === "Neto") {
      alert("Você já está logado como Neto");
    } else {
      this.setState({ nome: "Neto" });
    }
  }

  sair() {
    if (this.state.nome === "Visitante") {
      alert("Você já está logado como visitante");
    } else {
      this.setState({ nome: "Visitante" });
    }
  }

  render() {
    return (
      <div>
        <h2>Bem vindo(a), {this.state.nome}</h2>
        <button onClick={this.entrar}>Entrar como Neto</button>
        <button onClick={this.sair}>Sair</button>
      </div>
    );
  }
}
