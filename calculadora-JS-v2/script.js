// Calculadora Versão 2.0
'use strict';
const visor = document.getElementById('visor'); // Pega o que está no visor
const numeros = document.querySelectorAll('[id*=tecla]'); // Vai procurar parte do nome do atributo
const operadores = document.querySelectorAll('[id*=operador]');
let novoNumero = true;
let operador, numeroAnterior;
const operacaoPendente = () => operador !== undefined;

// Função utilizada para fazer o cálculo quando o operador for clicado. Ex.: 9+9+9 se transforma em 18+9
const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(visor.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarVisor(resultado);
        // switch(operador){
        //     case '+':
        //         atualizarVisor(numeroAnterior + numeroAtual);
        //         break;
        //     case '-':
        //         atualizarVisor(numeroAnterior - numeroAtual);
        //         break;
        //     case '*':
        //         atualizarVisor(numeroAnterior * numeroAtual);
        //         break;
        //     case '/':
        //         atualizarVisor(numeroAnterior / numeroAtual);
        //         break;
        // }
    }
}

// Função utilizada para atualizar o visor
const atualizarVisor = (texto) => {
    if(novoNumero){
        visor.textContent = texto.toLocaleString('BR');
        novoNumero = false
    }else{
        visor.textContent += texto.toLocaleString('BR');
    }
}

// Função utilizada para inserir o número e atualizar o visor
const inserirNumero = (evento) => atualizarVisor(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

// Pegar o operador utilizado no momento da expressão
const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(visor.textContent.replace(',','.'));
    }
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

// Calcular o total
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

// Limpar a tela e os cálculos.
const limparVisor = () => {
    visor.textContent = '';
    operador = undefined;
    numeroAnterior = undefined;
};
document.getElementById('limparVisor').addEventListener('click', limparVisor);

// Backspace
const removerUltimo = () => visor.textContent = visor.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimo);

// Função para realizar a raiz quadrada
const raiz = () => {
    var result = Math.sqrt(visor.textContent);
    novoNumero = true;
    if(result % 1 == 0){
        atualizarVisor(result)
    }else{
        atualizarVisor(result.toFixed(1))
    }
}
document.getElementById('raiz').addEventListener('click', raiz);

// Função para colocar a vígula/ponto no número e transformar ele em decimal.
const existeDecimal = () => visor.textContent.indexOf(',') !== -1;
const existeValor = () => visor.textContent.length > 0;
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarVisor(',');
        }else{
            atualizarVisor('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

// Mapa do teclado que será utilizado para usar o teclado para digitar na calculadora
const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    ',' : 'decimal',
    '.' : 'decimal',
    '+' : 'operadorSomar',
    '-' : 'operadorSubtrair',
    '*' : 'operadorMultiplicar',
    '/' : 'operadorDividir',
    'Escape' : 'limparVisor',
    'Backspace' : 'backspace',
    'Enter' : 'igual',
    '=' : 'igual'
}
// Mapear o teclado para quando uma tecla for digitada, clicar no botão referente aquela tecla.
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if(teclaPermitida()){
        document.getElementById(mapaTeclado[tecla]).click();
    }
}
document.addEventListener('keydown', mapearTeclado);


const ano = new Date
document.getElementById('anoAtual').innerText = ano.getFullYear()