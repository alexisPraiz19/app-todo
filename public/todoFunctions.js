/* create item task */
const itemTask = (id,todo, completed)=>{
    const task = `
        <li class='todo ${completed ? "todo-completed" : ""}'>
            <div class="border-gradient">
                <label for="${id}"></label>
                <input type="checkbox" class="input-check" id="${id}" ${completed ? "checked" : ""}/>
                <img src="./assets/images/icon-check.svg" alt="icon-check" class="icon-check ${completed ? "checked" : ""}"/>
            </div>

            <label for="${id}" class="todo-text ${completed ? "todo-completed" : ""}"> ${todo} </label>

            <img src="./assets/images/icon-cross.svg" alt="icon-cross" class="icon-cross"/>
        </li>`;
    return task;
};

let   arrayTodo = [];
let   id = 6;

export const setTodo = ()=>{ localStorage.setItem("todoList", JSON.stringify(arrayTodo)); }

export const getTodo = ()=>{
    const storage = localStorage.getItem("todoList");
    return JSON.parse(storage);
}

const setCounter = ()=>{ localStorage.setItem("counter", id); };

const getCounter = ()=>{
    const cont = localStorage.getItem("counter");
    return cont;
}

export const initCounter = ()=>{ if(getCounter() != null) id = getCounter(); }

/* To Do default interface */
export const todoDefault = (e)=>{
    const defaultList = [
        {
            id: 1,
            do: "Complete online JavaScript course",
            completed: false
        },{
            id: 2,
            do: "Jog around the park x3",
            completed: false
        },{
            id: 3,
            do: "10 minutes meditation",
            completed: false
        },{
            id: 4,
            do: "Read for 1 hour",
            completed: false
        },{
            id: 5,
            do: "Pick up groceries",
            completed: false
        },{
            id: 6,
            do: "Complete Todo App on Frontend Mentor",
            completed: false
        }
    ];
    
    const defaultListContainer = document.querySelector(".todo-ul");

    if(getTodo() != null) arrayTodo = getTodo();
    
    for(let list in defaultList){
        arrayTodo.push(defaultList[list]);
        defaultListContainer.innerHTML += itemTask(defaultList[list].id, defaultList[list].do, defaultList[list].completed);
        setTodo();
    };
};

/* List tasks */
export const listTask = ()=>{
   const storageTodo = getTodo();
   const list        = document.querySelector(".todo-ul");
   for(let i in storageTodo){ list.innerHTML += itemTask(storageTodo[i].id, storageTodo[i].do, storageTodo[i].completed); }
}


/*- Create and add new to do -*/
export const createNewTodo = (newTodo) =>{
    id++;
    setCounter();
    const list = document.querySelector(".todo-ul");
    list.innerHTML += itemTask(getCounter(), newTodo);

    let addTodo = {
        id,
        do: newTodo,
        completed: false
    }

    if(getTodo() != null) arrayTodo = getTodo();
    arrayTodo.push(addTodo);
    setTodo();

    const inputTodo = document.getElementById("todo-add");
    inputTodo.value = "";
};

/*- Mark to do -*/
function mark(event, n1, n2, boolean){
    const target = event; 
    const todoContainer = target.parentElement.parentElement;
    
    if(boolean){
        todoContainer.classList.add("todo-completed");
        todoContainer.classList.add("completed");
        todoContainer.children[n1].classList.add("todo-completed");
        todoContainer.firstElementChild.children[n2].classList.add("checked");

    }else if(!boolean){
        todoContainer.classList.remove("todo-completed");
        todoContainer.classList.remove("completed");
        todoContainer.children[n1].classList.remove("todo-completed");
        todoContainer.firstElementChild.children[n2].classList.remove("checked");
    }

    const deleteId  = parseInt(target.id);
          arrayTodo = getTodo();
    const switchCompleted  = arrayTodo.find(todo => todo.id == deleteId);
          switchCompleted.completed = boolean;
          setTodo();
};

export const markToDo = ()=>{
    const list = document.querySelector(".todo-ul");

    list.addEventListener("click",e=>{
        const target   = e.target;
        let   checkbox; 
        let   child;
        let   deleteId;
        
        if(target.tagName == "INPUT" || target.tagName == "LABEL"){
            if(target.classList.contains("input-check")){
                checkbox = target;

                if(checkbox.checked) mark(checkbox, 1, 2, true);
                else mark(checkbox, 1, 2, false);
            }
        };
        
        if(target.classList.contains("icon-cross")){
            child    = target.parentElement;
            deleteId = parseInt(child.firstElementChild.children[1].id);
            list.removeChild(child);
            
            arrayTodo = getTodo();
            const index = arrayTodo.findIndex(todo => todo.id == deleteId);
            if(index > -1) arrayTodo.splice(index, 1);
            setTodo();
        }
    });
}

/*- show Active to do -*/
function switchColorActiveSection(btn, section, target){
    target.add("activated"); 
    for(let i in btn){
        if(btn[i].classList.contains("activated") && !btn[i].classList.contains(section)){
           btn[i].classList.remove("activated");
        };
    }; 
};

function showSection(section, todo){
    if(section == "active"){
        for(let i in todo){
            if(todo[i].classList.contains("todo-completed"))  todo[i].style = "display: none";
            else todo[i].style = "display: flex";
        };

    }else if(section == "completed"){
        for(let i in todo){
            if(!todo[i].classList.contains("todo-completed"))  todo[i].style = "display: none";    
            else todo[i].style = "display: flex";
        };

    }else for(let i in todo) todo[i].style = "display: flex";  
    
    
};

export const interactiveContainer = (e) =>{
    const target     = e.target.classList;
    const buttons    = [...document.querySelectorAll(".interactive")];
    let   todoItem   = [...document.querySelectorAll(".todo")];

    if(target.contains("active")){
        showSection("active", todoItem);
        switchColorActiveSection(buttons, "active", target);

    }else if(target.contains("completed")){
        showSection("completed", todoItem);
        switchColorActiveSection(buttons, "completed", target);

    }else if(target.contains("all")){
        showSection("all", todoItem);
        switchColorActiveSection(buttons, "all", target);
    };
};

/* Clear completed - function */
export const clearCompleted = (e)=>{
    const buttons   = [...document.querySelectorAll(".interactive")];
    const todoList  = document.querySelector(".todo-ul");
    const completed = [...document.querySelectorAll(".completed")];
    arrayTodo = getTodo();

    switchColorActiveSection(buttons, "clear-completed", e.target.classList);
    const completedStorage = arrayTodo.filter(todo => todo.completed == true);

    for(let i in completedStorage){
        const index = arrayTodo.findIndex(index => index.id == completedStorage[i].id);
        arrayTodo.splice(index, 1);
        setTodo();
    }

    for(let i in completed) todoList.removeChild(completed[i]);
};