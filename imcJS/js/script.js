/*
    Método: Calcular IMC
    Autor: Deivisson Henrique
    Descrição: Calcula o índice de massa corporal - IMC
*/
function calcularIMC() {
    var formulario = document.getElementById("formulario");
    
    var kilos = parseInt(formulario.kilos.value);
    var metros = parseInt(formulario.metros.value);
    var centimetros = +formulario.centimetros.value;
    // Para forçar a conversão dos kilos, metros e centimetros que estão em string para numérico, pode-se utilizar o 'parseInt' ou '+' para a conversão dos tipos.
    
    var altura = (metros * 100 + centimetros) / 100;
    
    var imc = kilos / (altura * altura);
    
    formulario.imc.value = imc.toFixed(2);
    
    formulario.resultado.value = "O seu IMC é de " + imc.toFixed(2);
    
   /* if (imc <= 20){
        alert("Abaixo do peso");
    }else if (imc > 20 && imc <= 25){
        alert("Peso ideal");
    }else if (imc > 25 && imc <= 30){
        alert("Sobrepeso");
    }else if (imc > 30 && imc <= 35){
        alert("Obesidade Moderada");
    }else if (imc > 35 && imc <= 40){
        alert("Obesidade Severa");
    }else if (imc > 40 && imc <= 50){
        alert("Obesidade Mórbida");
    }else{
        alert("Super Obesidade");
    }*/
}