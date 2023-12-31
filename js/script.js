const task = []
let time = 0
let timer = null
let timeBreak = null
let current = null

const add = document.querySelector("#add")
const itTask = document.querySelector("#itTask")
const form = document.querySelector("#form")
const taskName = document.querySelector('#time #taskName')

form.addEventListener('submit', e =>{
    e.preventDefault()
    if(itTask.value != ''){
        createTask(itTask.value)
        itTask.value = ''
        renderTask()
    }
})

function createTask(value){

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

    const startButtons = document.querySelectorAll('.task .start-button')

    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            if(!timer){
                const id = button.getAttribute('data-id')
                startButtonHandler(id)
                button.textContent = 'En progreso..'
            }
        })
    })
}

function startButtonHandler(id) {
    time = 25 * 60
    current = id
    const taskIndex = task.findIndex(task => task.id === id)
    taskName.textContent = task[taskIndex].tittle

    timer = setInterval(() =>{
        timeHandler(id)
    }, 1000)
} 

function timeHandler(id) {
    time--
    renderTime()

    if(time === 0){
        clearInterval(timer)
        current = null
        taskName.textContent = ""
        renderTime()
    }
}

function renderTime(){
    const timeDiv = document.querySelector('#time #value')
    const minutes = parseInt (time / 60)
    const seconds = (time % 60)

    timeDiv.textContent = `${minutes < 10 ? '0': ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}