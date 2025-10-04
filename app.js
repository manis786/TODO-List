var input = document.getElementById("taskInput");

function ToDoAction() {
    if (input.value == "") {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cancel'
        })
    } else {
        var ul = document.getElementById("taskList");
        var li = document.createElement("li");
        var counter = ul.childElementCount;

        li.innerHTML = "<div class='outputLi'>" + input.value + "<div><button onclick='editTodo(" + counter + ")'>Edit</button><button onclick='deleteTodo(" + counter + ")'>Delete</button></div></div>"
        li.setAttribute("id", counter)
        ul.appendChild(li)
        input.value = ""
    }
}

function deleteTodo(id) {
    var li = document.getElementById(id)
    li.remove();
}

var editLiId;
function editTodo(id) {
  var li = document.getElementById(id);
  console.log("li ==>", li.childNodes[0].childNodes[0]);
  console.log("text ==>", li.firstChild.firstChild.nodeValue);
  
  input.value = li.childNodes[0].childNodes[0].nodeValue
//   var text = li.firstChild.firstChild.nodeValue;
//   input.value = text;
  document.getElementById("addTaskButton").style.display = "none";
  document.getElementById("editBtn").style.display = "inline-block";
  editLiId = id;
}

function editTodoLi() {
  console.log("input ==>", input.value);
  var li = document.getElementById(editLiId);
  console.log("li ==>", li);
  li.firstChild.firstChild.nodeValue = input.value;
  input.value = ""
  document.getElementById("addTaskButton").style.display = "inline-block";
  document.getElementById("editBtn").style.display = "none";
}