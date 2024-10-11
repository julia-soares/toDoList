const toDo = document.querySelector(`#to-do`);
const button = document.querySelector('.btn');
const tarefas = document.querySelector('.tarefas');
let toDoArr = [];
let removeBtn;

function createLi(){
    let li = document.createElement(`li`);
    return li;
}
function createBtn(li){
    li.innerText += ` `;
    let removeBtn = document.createElement(`button`);
    removeBtn.innerText ='Remover';
    li.appendChild(removeBtn);
    removeBtn.setAttribute('class', 'remove');
    return removeBtn;
}
function cleanInput(){
    toDo.value ='';
    toDo.focus();
}
toDo.addEventListener('keypress', function(event){
    if(event.keyCode ===13){
        if (!toDo.value) return;
        createToDo(toDo.value);
    }
});
function createToDo(textoInput){
    //exibir os afazeres
    const li = createLi();
    // let removeBtn = createBtn();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    cleanInput();
    createBtn(li);
    saveToDos();
}

button.addEventListener('click', function (event){
    //previnir que atualize a pagina
    event.preventDefault();
    //previnir input vazio
    if (!toDo.value) return;
    //vamos chamar a função aqui para podermos elaborar o codigo no escopo da função 
    //e nao dentro do addEventListener
    createToDo(toDo.value);
});
//i need to create an array that will be feed by the inputs. 
//In each array we have an index

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('remove')){
        el.parentElement.remove();
        saveToDos();
    };
})
function saveToDos(){
const liToDo = tarefas.querySelectorAll(`li`);
const listToDo = [];
for(let tarefa of liToDo){
    let toDoText = tarefa.innerText;
    toDoText = toDoText.replace('Remove', '').trim();
    listToDo.push(toDoText);
}
//transformando em uma string de JSON
const tarefasJSON = JSON.stringify(listToDo);
//salvando no local storage (como se fosse uma base de dados do proprio navegador).
localStorage.setItem('tarefas', tarefasJSON);
}
function addSavesToDo(){
    const tarefas = localStorage.getItem('tarefas');
    const toDoList =  JSON.parse(tarefas);
    for(let tarefa of toDoList){
        createToDo(tarefa);
    }
}
addSavesToDo();
