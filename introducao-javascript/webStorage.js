let nome = "";

if (typeof localStorage.nome == "undefined") {
  localStorage.nome = prompt("Digite seu nome:");
}

nome = localStorage.nome;
document.getElementById("mostraNome").innerHTML = `Olá ${nome}`;
