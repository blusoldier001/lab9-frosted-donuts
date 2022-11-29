var ids = [];
var names = [];
var completed = [];

var api_key = "4b33b3-3484be-126ad0-60f9b5-9f39d6";
function render() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var a = document.getElementById("Todo-Items");
            removeAllChildNodes(a);
            ids = [];
            names = [];
            completed = [];
            var test = JSON.parse(this.responseText);
            for( let i = 0; i < test.length; i++ ) {
                let test1 = test[i]; // gets the ith todo
              // Now you can access any of the properties pertaining to that particular todo
                let id = test1.id;
                let text = test1.text;
                let isCompleted = test1.completed;
                ids.push(id);
                names.push(text);
                completed.push(isCompleted);
                var currLine = document.createElement("div");
                currLine.id = i;
                var newContent = document.createElement("p");
                newContent.innerHTML = text;
                var currButton = document.createElement("button");
                var completedButton = document.createElement("button");
                var completedButtonID = "button" + i;
                completedButton.id = completedButtonID;
                if(isCompleted == true){
                    completedButton.className = "";
                    completedButton.classList.add('completedButton');
                    completedButton.innerHTML = "Completed";
                }
                else{
                    completedButton.className = "";
                    completedButton.classList.add('incompleteButton');
                    completedButton.innerHTML = "Incomplete";
                }
                completedButton.onclick = function() {
                    toggleComplete(completedButtonID, i);
                };
                currButton.innerHTML = "Remove";
                currButton.onclick = function() {
                    remove(i);
                };
                currLine.appendChild(completedButton);
                currLine.appendChild(newContent);
                currLine.appendChild(currButton);
                currLine.classList.add('Todo-Item-Single');
                a.appendChild(currLine);
            }
          }
        };
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", api_key);
    xhttp.send();
    
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function submit() {
    var text = document.getElementById("todo_text").value;
    document.getElementById("todo_text").value = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("success");
            render();
          }
        };
    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", api_key);
    xhttp.send(JSON.stringify({"text": text}));
}
render();

function remove(idx){
    var currName = names[idx];
    var currId = ids[idx];
    var currCompleted = completed[idx];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("success");
            render();
          }
        };
    let url = "https://cse204.work/todos/" + currId;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", api_key);
    xhttp.send();
}

function toggleComplete(buttonID, idx){
    var currId = ids[idx];
    var status = completed[idx];
    newStatus = false;
    if (status == false){
        newStatus = true;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("success");
            render();
          }
        };
    let url = "https://cse204.work/todos/" + currId;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", api_key);
    xhttp.send(JSON.stringify({"completed": newStatus}));
    completedButton = document.getElementById(buttonID);
    if(newStatus == true){
        completedButton.className = "";
        completedButton.classList.add('completedButton');
        completedButton.innerHTML = "Completed";
    }
    else{
        completedButton.className = "";
        completedButton.classList.add('incompleteButton');
        completedButton.innerHTML = "Incomplete";
    }
}

function enterPressed(event){
    if(event.key == "Enter"){
        submit();
    }
    
}