heading = document.getElementsByTagName("h1");
input = document.getElementById("task");
button = document.getElementById("addTask");
taskList = document.getElementById("taskList");
remainingTasks = document.getElementById("remainingTasks");
//Now I will use array for storing tasks but I will use local storage for storing tasks in browser so that when we refresh the page the tasks will not be lost.
let tasks = [];
 function updateRemainingTasks() {
            const remaining = tasks.filter(task => task.completed === false);
            remainingTasks.textContent = remaining.length + " tasks remaining";
        }
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
const savedTasks = localStorage.getItem("tasks") //Ager local storage mein array saved ha but wo string format mein saved ha tou abhi saveTasks mein bhi data string format mein he fetch howa ha---> isko abhi change karna ha 
if (savedTasks) {                       //Local Storage-->getItem()-->savedTasks (string)-->JSON.parse()-->tasks array mein again convert hou jaye gy
    tasks = JSON.parse(savedTasks);
}
//Ye page reload karne ke baad jou task ghaib hou jaty hein uss ke liye DOM set kar rahe hein
function renderTasks() {
    //tasks array ke har object ko one-by-one lena aur uska <li> DOM mein banana.
    tasks.forEach((task) => {  //yahan per task object ko represent kar raha ha na ke task input wali string ko jo hum user se task ly rahe hein 
        const li = document.createElement("li");
        li.textContent = task.text;
        //Checkbox
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        //checkbox.checked DOM ki state ha and // task.completed object ki state ha 
        checkBox.checked = task.completed;  //Page reload karne per DOM reset hou jata ha phir checkbox unchecked hou jata ha but ab bhi result local storage mein ha 
        if(task.completed) {  //Agar data mein task already completed hai, to naye <li> ko bhi completed class de do.
            li.classList.add("completed")
        }
        checkBox.addEventListener("click", function() {
             if(checkBox.checked) {
                task.completed = true;
                li.classList.add("completed")
        }
        else{
            task.completed = false;
            li.classList.remove("completed")
        }
         saveTasks();
        updateRemainingTasks();
        });
        li.appendChild(checkBox);
        //EditButton
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
          editButton.addEventListener("click", function() {
            console.log("Edit button for checking task"); // for just checking edit listener is working or not we can see print this and we an check results in console(f12)
            const editTask = prompt("Edit task:", task.text);  //Yahan task current object ke task ko show kar raha ha
            if (editTask !== null && editTask.trim() !== "") {
                task.text = editTask.trim();
                li.firstChild.textContent = editTask.trim(); //firstChild ka matlab "first task" nahi hai. her li mein text,checkbox,edit and delete ha uss ke according text first child ha ....ok
            }
             saveTasks();
        });
        li.appendChild(editButton);
        //DeleteButton
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(taskItem => taskItem.id !== task.id);
            taskList.removeChild(li)
            saveTasks();
            updateRemainingTasks();
        });
        
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    })
};
        renderTasks()
        updateRemainingTasks()
//Add Button
button.addEventListener("click", function() {
    const task = input.value.trim(); //trim() fun extra spaces ko remove kar deta ha like "   Javascript   " is ko aise "javascript" kar dega
    if (task) {
        const newTask = {
            id: Date.now(),
            text: task,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        updateRemainingTasks();
        console.log(tasks);
        const li = document.createElement("li");
          li.textContent = task;
        const checkBox = document.createElement("input"); //yaan just html create karne ka tag likh sakte hein uss ki type/attribute ko baad mein define karein gy
        checkBox.type = "checkbox";    
        checkBox.addEventListener("click", function() {
            if (checkBox.checked) {
                newTask.completed = true;
                li.classList.add ("completed");
                //Below line Hum ne li ko class add karne ke liye likha tha but ab neechy wali line ko comment kar raha hoon kyunk ab array based projects mein change kar raha hoon
                //..ok..this one..li.classList.add ("completed");
                //li hum ne dynamically JS se create ki ha tou uss uss ko class assign karne ke liye hum classlist.add("Aur is ka andar class ka name likhte hein") is tarhan se JS mein kisi ko class de jate ha simple html mein hum just <li class = "completed"></li> kar letay hein REASON:Hum is ko style dene ke liye kaar rahe hein
                //Jab checkbox click ho → check karo checkbox checked hai? → agar haan → li mein completed class add kar do. kyun css se hum linethrough remove kar sakte hein 
                //li.classList.add("completed");       // class add
                //li.classList.remove("completed");    // class remove
                //li.classList.toggle("completed");    // add/remove automatically
                //li.classList.contains("completed");  // check karta hai class hai ya nahi
            }else {
                newTask.completed = false;
                li.classList.remove ("completed");
                //Below line remove ki ha kyunk ab class remove nhi karne ab array based projects mein cahnge kar raha hoon  
                //li.classList.remove ("completed");
            };
            saveTasks();
            updateRemainingTasks();
        });
        li.appendChild(checkBox);
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function() {
            console.log("Edit button for checking task"); // for just checking edit listener is working or not we can see print this and we an check results in console(f12)
            const editTask = prompt("Edit task:", task);
            if (editTask !== null && editTask.trim() !== "") {
                newTask.text = editTask.trim();
                li.firstChild.textContent = editTask.trim(); //firstChild ka matlab "first task" nahi hai. her li mein text,checkbox,edit and delete ha uss ke according text first child ha ....ok
            };
            saveTasks();
        });
        li.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(taskItem => taskItem.id !== newTask.id);
            taskList.removeChild(li)
            updateRemainingTasks();
            saveTasks();
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        input.value = "";          
    }
    else {
        alert("Please enter a task.");

    }
})
