//función que arma el elemento html y lo retorna
const crearTarea = (txt_title, txt_description, id) => {
    const task = document.createElement("div");
    task.classList.add("card", "ps-3", "pt-2", "mb-3");
    console.log("id:", id);
    task.setAttribute("id", id);

    const title = document.createElement("p");
    title.classList.add("h4");
    title.textContent = txt_title;

    const description = document.createElement("p");
    description.textContent = txt_description;

    const button_div = document.createElement("div");
    button_div.classList.add("d-grid", "gap-2", "d-md-block", "mb-3");

    const btn_delete = document.createElement("button");
    btn_delete.classList.add("btn", "btn-danger", "btn-delete");
    btn_delete.setAttribute("id", id);
    btn_delete.textContent = "delete";

    button_div.appendChild(btn_delete);



    task.appendChild(title);
    task.appendChild(description);
    task.appendChild(button_div);

    return task;
};

const mostrarTareas = () => {
    if(!(localStorage.getItem("tasks") === null)){
        let taskList = JSON.parse(localStorage.getItem("tasks"));
    
        const fragmentTasks = document.createDocumentFragment();
    
        taskList.forEach(element => {
            const elemTask = crearTarea(element.title, element.description, element.id);
    
            fragmentTasks.appendChild(elemTask);
        });
    
        tasks.appendChild(fragmentTasks);
    }
};

//elementos de entrada y de salida
const form = document.getElementById("form-task");
const tasks = document.getElementById("tasks");

//id para las tareas (asocia las tareas con la posición que tienen en el array de tareas)
let id = 0;

//algoritmo de añadir taréa en el localStorage
form.addEventListener("submit", (e) => {
    //evita que se refresque la página
    e.preventDefault();

    //se obtienen los datos
    const txt_title = document.getElementById("txt-title");
    const txt_description = document.getElementById("txt-description");

    //se crea el objeto que guarda la tarea
    const task = {
        title: txt_title.value,
        description: txt_description.value,
        id: id
    }

    //comprueba si hay tareas o no
    if(localStorage.getItem("tasks") === null){
        //Si no hay tareas, vamos a crear tareas

        //se crea el array de tareas
        let tasksList = [];
        tasksList.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasksList));
    }else{
        //si ya existen, vamos a actualizar

        //se obtiene los datos del localStorage
        let tasksList = JSON.parse(localStorage.getItem("tasks"));

        task.id = tasksList.length;

        //se agrega al array
        tasksList.push(task);

        //se vuelve a guardar
        localStorage.setItem("tasks", JSON.stringify(tasksList));
    }
    //se arma el elemento
    const elemTask = crearTarea(txt_title.value, txt_description.value, task.id);

    //se añade el elemento al html
    tasks.appendChild(elemTask);
});

//evento de eliminar una tarea
tasks.addEventListener("click", (e) => {
    //obtengo las tareas del local storage
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    
    //elimina la tarea del array
    taskList.splice(e.target.getAttribute("id"), 1);
    
    //cambia todos los id
    taskList.forEach((tarea, index) => {
        tarea.id = index;
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));
    
    //elimina al elemento del dom
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
});

//muestra las tareas cuando se haya cargado la página
mostrarTareas();

let taskNode = tasks.children;
console.log(taskNode[1].getAttribute("id"));