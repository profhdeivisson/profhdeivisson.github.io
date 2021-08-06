const opcoes = ["pedra", "papel", "tesoura"];
const opImg = ["✊", "✋", "✌"];
const perde = {
  pedra: "papel",
  papel: "tesoura",
  tesoura: "pedra",
};
let pontoPc = 0;
let pontoUsuario = 0;
let ptsPc = document.getElementById("ptsPc");
let ptsUsuario = document.getElementById("ptsUsuario");
let resultado = document.getElementById("resultado");

function escolha(botao) {
  const usuario = botao.value;
  const pc = opcoes[Math.floor(Math.random() * opcoes.length)];
  switch (usuario) {
    case "pedra":
    case "papel":
    case "tesoura":
      if (pc === usuario) {
        resultado.innerHTML = `${opImg[opcoes.indexOf(usuario)]} X ${opImg[opcoes.indexOf(pc)]}<br><span style="color: DarkOrange; font-weight: bold">Ops, deu empate!</span>`;
      } else {
        if (perde[pc] === usuario) {
          resultado.innerHTML = `${opImg[opcoes.indexOf(usuario)]} X ${opImg[opcoes.indexOf(pc)]}<br><span style="color: LimeGreen; font-weight: bold">Você ganhou!</span>`;
          pontoUsuario++;
        } else {
          resultado.innerHTML = `${opImg[opcoes.indexOf(usuario)]} X ${opImg[opcoes.indexOf(pc)]}<br><span style="color: Red; font-weight: bold">Você perdeu!</span>`;
          pontoPc++;
        }
      }
      break;
  }
  ptsPc.innerHTML = pontoPc;
  ptsUsuario.innerHTML = pontoUsuario;
  if (pontoPc == 10) {
    alert("O PC ganhou!");
    reset();
  } else if (pontoUsuario == 10) {
    alert("Você ganhou!");
    reset();
  }
}

function reset() {
  ptsPc.innerHTML = 0;
  ptsUsuario.innerHTML = 0;
  pontoPc = 0;
  pontoUsuario = 0;
  resultado.innerHTML = "";
}
