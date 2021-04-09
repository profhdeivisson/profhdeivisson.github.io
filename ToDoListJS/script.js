'use strict'



// let bd = [
//     {'tarefa': 'Estudar JS', 'status': ''},
//     {'tarefa': 'Estudar HTML', 'status': 'checked'},
//     {'tarefa': 'Estudar NODE', 'status': 'checked'},
//     {'tarefa': 'Estudar CSS', 'status': ''}
// ]

const buscaBD = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const atualizarBD = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))
const criarTarefa = (tarefa, status, indice) => {
    const pai = document.createElement('div')
    pai.classList.add('pai', 'd-flex', 'flex-row', 'col-9', 'col-md-10', 'col-sm-10')
    const item = document.createElement('label')
    item.classList.add('itemTarefa', 'd-flex', 'bg-white', 'text-dark', 'mb-2', 'pt-0', 'pb-0', 'justify-content-start', 'form-control', 'col-10', 'col-md-10', 'col-sm-10')
    item.innerHTML = `
    <div class="d-flex align-items-center">
    <input type="checkbox" ${status} data-indice="${indice}" class="me-1 d-none form-check-input">
    <span class="tarefa flex-row text-break">${tarefa}</span>
    </div>
    `
    const botoes = document.createElement('label')
    botoes.innerHTML = `
    <div class="d-flex flex-row">
    <button id="editarTarefa" data-indice="${indice}" class="btn btn-info"><i id="iconEditarTarefa" data-indice="${indice}" class="fas fa-edit"></i></button>
    <button id="deletarTarefa" data-indice="${indice}" class="btn btn-danger"><i id="iconDeletarTarefa" data-indice="${indice}" class="far fa-trash-alt"></i></button>
    </div>
    `
    botoes.classList.add('d-flex', 'text-dark', 'mb-2', 'pt-0', 'pb-0', 'justify-content-start')
    document.getElementById('todoList').appendChild(pai)
    pai.appendChild(item).after(item, botoes)
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

// const atualizaClasse = (indice) => {
//     const bd = buscaBD()
//     const statusTarefa = bd[indice].status
//     const tarefaAtual = document.getElementsByClassName('tarefa')[indice]
//     if(statusTarefa === 'checked'){
//         tarefaAtual.classList.toggle('text-decoration-line-through')
//     } else {
//         tarefaAtual.classList.toggle('text-decoration-none')
//     }
// }

const atualizarTela = () => {
    limparTarefas()
    const bd = buscaBD()
    bd.forEach((item, indice) => criarTarefa(item.tarefa, item.status, indice))
}

const cadastrarTarefa = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value
    if(tecla === 'Enter'){
        if(texto === ''){
            alert('Digite uma tarefa!')
        } else {
            const bd = buscaBD()
            bd.push({'tarefa': texto, 'status': ''})
            atualizarBD(bd)
            atualizarTela()
            evento.target.value = ''
        }
    }
}

const cadastrarTarefaMouse = (e) => {
    const clique = e.type
    const texto = document.getElementById('novaTarefa').value
    if(clique === 'click'){
        if(texto === ''){
            alert('Digite uma tarefa!')
        } else {
            const bd = buscaBD()
            bd.push({'tarefa': texto, 'status': ''})
            atualizarBD(bd)
            document.getElementById('novaTarefa').value = ''
            atualizarTela()
            e.value = ''
        }
    }
}

const removerItem = (indice) => {
    const bd = buscaBD()
    bd.splice(indice, 1)
    atualizarBD(bd)
    atualizarTela()
}

const atualizarItem = (indice) => {
    const bd = buscaBD()
    bd[indice].status = bd[indice].status === '' ? 'checked' : ''
    atualizarBD(bd)
    atualizarTela()
}

const editarItem = (indice) => {
    const bd = buscaBD()
    let editado = prompt('Edite a tarefa selecionada', bd[indice].tarefa)
    if(editado === null){
        return bd[indice].tarefa
    } else {
        bd[indice].tarefa = editado
    }
    atualizarBD(bd)
    atualizarTela()
}

const clickItem = (evento) => {
    const elemento = evento.target
    if(elemento.id === 'deletarTarefa' || elemento.id === 'iconDeletarTarefa'){
        console.log(elemento)
        const indice = elemento.dataset.indice
        removerItem(indice)
    } else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice
        atualizarItem(indice)
        // atualizaClasse(indice)
    } else if(elemento.id === 'editarTarefa' || elemento.id === 'iconEditarTarefa'){
        const indice = elemento.dataset.indice
        editarItem(indice)
    }
}

const limparLista = () => {
    localStorage.clear(buscaBD)
    atualizarTela()
}

document.getElementById('novaTarefa').addEventListener('keypress', cadastrarTarefa)
document.getElementById('btnAddTarefa').addEventListener('click', cadastrarTarefaMouse)
document.getElementById('todoList').addEventListener('click', clickItem)
document.getElementById('btnLimpar').addEventListener('click', limparLista)

atualizarTela()