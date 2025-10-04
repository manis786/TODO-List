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
var users = JSON.parse(localStorage.getItem("usersData")) || [];
function signupUser() {
  var usernameValue = document.getElementById("newUsername").value;
  var emailValue = document.getElementById("Newemail").value;
  var passwordValue = document.getElementById("newPassword").value;
  var repeatPasswordValue = document.getElementById("repeatPassword").value;
  if (passwordValue != repeatPasswordValue) {
    alert("Password and Repeat Password must be same!");
    return;
  }
  // var user = {};
  // user.email = emailValue;
  // user.password = passwordValue;

  var user = {
    username: usernameValue,
    email: emailValue,
    password: passwordValue
  }
  users.push(user);
  localStorage.setItem("usersData", JSON.stringify(users));
  location.href = "./login.html"
}
function loginUser() {
  var emailValue = document.getElementById("luser").value;
  var passwordValue = document.getElementById("lpassword").value;
  // var users = JSON.parse(localStorage.getItem("usersData"));
  var userFound = false;
  // for (var i = 0; i < users.length; i++) {
  //   var user = users[i];
  // }
  for (var index in users) {
    var user = users[index]
    if (user.email == emailValue && user.password == passwordValue) {
      alert("User Authenticated Successfully!")
      userFound = true
      var currentUser = {
        username: user.username,
        email: user.email
      }
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

      var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      console.log("currentUser==>", currentUser);
      if (currentUser == null) {

        var h4 = document.getElementById("welcomeUser").value;
        h4.innerHTML = "Welcome ! " + currentUser.username;
      }
      location.href = "./index.html"
    }
  }
  if (!userFound) {
    alert("User not found!")
    location.href = "./signup.html";
  }
}
var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));


function logout() {
  sessionStorage.removeItem("currentUser");
  location.href = "./login.html"
}