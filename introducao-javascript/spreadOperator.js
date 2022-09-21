function cadastroPessoa(info) {
  let novosDados = {
    ...info,
    cargo: "Dev",
  };
  return novosDados;
}

console.log(
  cadastroPessoa({
    nome: "Antonio",
    sobrenome: "Neto",
    ano: 2022,
  })
);
