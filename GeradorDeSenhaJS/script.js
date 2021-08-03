let btnGerarSenha = document.getElementById("btnGerarSenha");
let campoSenha = document.getElementById("campoSenha");
const copiarSenha = document.getElementById("copiarSenha");

btnGerarSenha.addEventListener("click", function () {
  const minusculo = "abcdefghijklmnopqrstuvwxyzç";
  const maiusculo = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ";
  const numeros = "0123456789";
  const simbolos = "!@#$%¨&*_-+=<>,.;:|/";
  const todos = minusculo + maiusculo + numeros + simbolos;
  const tamanhoDaSenha = 16;
  var senha = "";

  for (let i = 0; i < tamanhoDaSenha; i++) {
    let numeroAleatorio = Math.floor(Math.random() * todos.length);
    senha += todos.substring(numeroAleatorio, numeroAleatorio + 1);
  }

  campoSenha.value = senha;
})
copiarSenha.addEventListener("click", function(){
  if(campoSenha.value == ""){
    alert("Clique em GERAR SENHA primeiro para copiar a Senha!")
  }else{
    campoSenha.select();
    document.execCommand('copy');
    alert("Senha Copiada com sucesso!");
  }
})