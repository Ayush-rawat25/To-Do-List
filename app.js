document.addEventListener("DOMContentLoaded",()=>{
  const storedTask = JSON.parse(localStorage.getItem('tasks'))
  if(storedTask){
    storedTask.forEach((task)=>tasks.push(task))
    updateTaskList()
    updateStats()
  }
})

let tasks = [];

const saveTask =()=>{
  localStorage.setItem('tasks',JSON.stringify(tasks))
  console.log("saved")
}

const addTask = () => {
  const taskInput = document.getElementById("input");
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    updateTaskList();
    updateStats()
    saveTask()
  }
};

const toggleTaskComplete = (index) =>{
  tasks[index].completed = !tasks[index].completed;
  updateTaskList()
  updateStats()
  saveTask()
}

const deleteTask=(index)=>{
  tasks.splice(index,1);
  updateTaskList()
  updateStats()
  saveTask()
}

const editTask=(index)=>{
  const taskInput=document.getElementById("input")
  taskInput.value=tasks[index].text

  tasks.splice(index,1)
  updateTaskList()
  updateStats()
  saveTask()
}

const updateStats=()=>{
  const completeTask=tasks.filter(task=>task.completed).length
  const totalTask=tasks.length
  const progress=(completeTask/totalTask)*100
  const progressBar=document.querySelector(".progress")
  if(completeTask==0 && totalTask==0){
    progressBar.style.width=`0%`
  }else{
    progressBar.style.width=`${progress}%`
  }
  const num = document.querySelector(".num")
  num.innerText=`${completeTask}/${totalTask}`
  if(tasks.length && completeTask==totalTask){
    blastConfetti()
  }
}

const updateTaskList = () => {
    const taskList = document.querySelector(".tasklist");
    taskList.innerHTML = "";
    tasks.forEach((task,index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <div class="taskItem">
          <div class="task ${task.completed? "completed":""}">
              <input class="checkbox" type="checkbox" ${task.completed? 'checked':''}/>
              <p>${task.text}</p>
          </div>
          <div class="icons">
              <img src="images/edit.png" onclick="editTask(${index})"/>
              <img src="images/bin.png" onclick="deleteTask(${index})"/>
          </div>
      </div>`;
      listItem.addEventListener('change',()=> toggleTaskComplete(index))
      taskList.append(listItem)
  
    });
  };

document.getElementById("newTask").addEventListener("click", function(e) {
  e.preventDefault();
  addTask();

});

const blastConfetti = ()=>{
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
