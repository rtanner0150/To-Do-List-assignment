/* GET function */
async function getToDoList(){
    let requestOptions = {
        method: "GET",
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/tasks", requestOptions); 
    const body = await response.json();
    if(response.status != 200){
        throw Error(body.message);
    }
    return body; 
};

/* this generates the tasks HTML */
function clickButton(){
    getToDoList().then(function(body){
       document.getElementById('myListContainer').innerHTML = '';
        for(let i =0; i < body.length; i++){
            let node = 
            document.createElement('div');
            node.setAttribute('class','card');
            document.getElementById('myListContainer').appendChild(node).innerHTML = 
                `
                    <div class="card-header">
                        <h6>
                            ${body[i].taskPriority}
                            <a class="editBtn" href="./edit.html?id=${body[i]._id}"><i class="fas fa-pencil-alt"></i></a>
                            <a id="delete" class="delete" data-id="${body[i]._id}"><i data-id="${body[i]._id}" class="far fa-trash-alt deleteIcon delete"></i></a>
                        </h6>
                    </div>    
                    <div class="card-body">
                        <p>
                            ${body[i].taskName}
                                <br>
                            ${body[i].assignee}
                                <br> 
                            ${body[i].completed}
                        </p>
                    </div>
                `
        }
            let deleteButtons = document.getElementsByClassName("delete");
            for(let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener("click", function(event){
                    event.preventDefault();
                    deleteTask(event.target.dataset.id);
                    console.log(event.target);
                });
             }
            // let myObjs = JSON.stringify(body);
            // document.body.append(myObjs);
            console.log("it's pay day baby!")
    }).catch(function(err){
        console.log(err); 
    }); 
};

/* start of POST task */

async function postTask(){
    let node =  { 
        taskName: document.getElementById('taskName').value,
        assignee: document.getElementById('assignee').value,   
        taskPriority: document.getElementById('taskPriority').value,
        completed: document.getElementById('completed').value
      }
            
    let requestOptions = {
    method: "POST",
    body: JSON.stringify(node),
    headers : { "Content-Type": "application/json"}
    }

    const response = await fetch("/postTask", requestOptions);
    if(response.status != 200){
    throw Error("Error!");
    }
    return node;
};

function submitTask(){
    postTask()
    .then (function(){
        console.log("ya did it, babe")
    })
    .catch (function(){
        console.log("error will robinson")
    })
} 

/* this is the end of the POST function */
/* this is the start of DELETE function */


function deleteTask(taskID){
    deleteTaskRequest(taskID).then(function(success){
        alert("deleted");
        window.location.href="index.html"
    }).catch(function(error) {
        console.log("error");
    })
}

async function deleteTaskRequest(taskId){
    let butts={_id: taskId}
    let requestOptions = {
        method: "DELETE",
        body: JSON.stringify(butts),
        headers : { "Content-Type": "application/json"}
    }

    const response = await fetch('/deleteTask', requestOptions);
    if(response.status != 204){
        throw Error("Error!");
    }
    return true;
}


/* this is the end of DELETE function */
/* this is the start of PUT function or update! */

async function updateTask(el){
    let prioritySelect = document.getElementById('taskPriority');
    let completedSelect = document.getElementById('completed');
    let t = {
        name: document.getElementById('taskName').value,
        assignedTo: document.getElementById('assignee').value,
        priority: prioritySelect.options[prioritySelect.selectedIndex].value,
        completed: completedSelect.options[completedSelect.selectedIndex].value
    }
    let requestOptions = {
        method: 'PUT',
        body: JSON.stringify(t),
        headers: {'Content-Type': 'application/json'}
    }
    const response = await fetch('/tasks/' + taskId, requestOptions);
    if (response.status != 200){
        throw Error('task not saved!');
    }
    window.location.href = 'index.html';
    return true;
}