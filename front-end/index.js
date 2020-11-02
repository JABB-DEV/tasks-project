const url = "http://localhost:3000/",
    task_list = document.getElementById('tasks-list'),
    task_history = document.getElementById('tasks-complete'),
    taskF = document.getElementById('taskF')

window.onload = () => {
    taskAll()
}

const taskAll = () => {
    fetch(url + "tasks")
        .then(response => response.json())
        .then(data => {
            data.map(value => {
                value.complete ? renderComplete(value) : renderTask(value)
            })
        })
}
const renderTask = item => {
    let liTask = document.createElement('li')
    
    task_list.appendChild(liTask)
    liTask.setAttribute('id', item._id)
    liTask.setAttribute('class', 'list-group-item')
    
    let template = `
    <a href="#" onclick="deleteTask('${item._id}')" class="btn btn-link" title="Eliminar tarea">X</a>
    <span class="h5">${item.name}</span>
    <p class="text-small">${item.desc} </p>
    <p class="text-muted text-smalll d-flex justify-content-between">Created-at: ${item.created_at.substring(0, 10)}<a href="#" onclick="doneTask('${item._id}')" class="btn btn-link" title="Terminar la tarea">Terminar tarea</a></p>`
    liTask.innerHTML = template
}

const renderComplete = item => {
    let liTask = document.createElement('li')
    
    task_history.appendChild(liTask)
    liTask.setAttribute('id', item._id)
    liTask.setAttribute('class', 'list-group-item')
    
    let template = `
    <a href="#" onclick="deleteTask('${item._id}')" class="btn btn-link" title="Eliminar tarea">X</a>
    <span class="h5">${item.name}</span>
    <p class="text-small">${item.desc} </p>
    <p class="text-muted text-smalll d-flex justify-content-between">Created-at: ${item.created_at.substring(0, 10)}<a href="#" onclick="doneTask('${item._id}')" class="btn btn-link" title="Terminar la tarea">Terminar tarea</a></p>`
}

taskF.onsubmit = (e) => {
    e.preventDefault()
    if (taskF.name.value.trim().length === 0 || taskF.desc.value.trim().length === 0) return alert('Debe rellenar todos los datos')
    fetch(url + "tasks", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            name: taskF.name.value,
            desc: taskF.desc.value,
            created_at: new Date(),
            complete: false
        })
    })
        .then(response => response.json())
        .then(data => {
            renderTask(data)
            taskF.reset()
            taskF.name.focus()
        })
}
const deleteTask = id => {
    let wConfirm = confirm('¿En verdad deseas eliminar la tarea?')
    if (wConfirm) {
        fetch(url + "tasks/" + id, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-type': 'application/json'
            },
            redirect: 'follow'
        }).then(res => document.getElementById(id).parentNode.removeChild(document.getElementById(id)))
    }
}