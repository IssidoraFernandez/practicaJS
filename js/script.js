const task = []
let time = 0
let timer = null
let timeBreak = null
let current = null

const add = document.querySelector("#add")
const itTask = document.querySelector("#itTask")
const form = document.querySelector("#form")

form.addEventListener('submit', e =>{
    e.preventDefault()
    if(itTask.value != ''){
        createTaks(itTask.value)
        itTask.value = ''
        renderTask()
    }
})

function createTaks(value){

    const newTask = {
        id: (Math.random()* 100).toString(36).slice(3),
        tittle: value,
        completed: false
    }

    task.unshift(newTask)
}

function renderTask(){
    const html = task.map(task =>{
        return `
        <div class = "task">
            <div class = "completed">${task.completed  ? `<span>Done</span> `:`<button class ="start-button" data-id = "${task.id}" >Start</button>`}</div>
            <div class = "tittle">${task.tittle}</div>
        </div>
        `
    })
    
    const taskContainer = document.querySelector("#task")
    taskContainer.innerHTML = html.join("")
}