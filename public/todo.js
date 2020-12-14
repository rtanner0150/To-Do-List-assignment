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

function clickButton(){
    getToDoList().then(function(body){
       
        for(let i =0; i < body.length; i++){
            let node = document.createElement('li');
            document.body.appendChild(node).innerHTML = "Task: " + body[i].taskName + " | " + "Who: " + body[i].assignee + " | " + "Importance: " + body[i].taskPriority + " | " + "Completed: " + body[i].completed
        }
            // let myObjs = JSON.stringify(body);
            // document.body.append(myObjs);
            console.log("it's pay day baby!")
    }).catch(function(err){
        console.log(err); 
    }); 
};

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