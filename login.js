function register() { //utk regis
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  if (localStorage.getItem(username)) {
    document.getElementById("message").innerText = "Username already exists. Please choose another.";
  } else if (username && password) {
    const user = { username, password };
    localStorage.setItem(username, JSON.stringify(user));
    document.getElementById("message").innerText = "Registration successful! You can now log in.";
  } else {
    document.getElementById("message").innerText = "Please enter a valid username and password.";
  }
}

function login() { //fitur login
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const storedUser = JSON.parse(localStorage.getItem(username));

  if (storedUser && storedUser.password === password) {
    localStorage.setItem("loggedInUser", username);
    document.getElementById("message").innerText = "";
    checkLoginStatus();
  } else {
    document.getElementById("message").innerText = "Username or password is incorrect.";
  }
}

// document.addEventListener("DOMContentLoaded", function() { //kalo html loaded jalanin fungsi cek login
//   checkLoginStatus();
// });
function checkLoginStatus() { //cek login ketika data ada di lokal
  const storedUsername = localStorage.getItem("loggedInUser"); //nyari ke lokal storage

  if (storedUsername) {
    document.getElementById("greeting").innerText = `Hi, ${storedUsername}`;
    document.getElementById("login-form").style.display = "none";
    document.getElementById("logout").style.display = "inline";
  } else {
    document.getElementById("greeting").innerText = "Please log in or register";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("logout").style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  checkLoginStatus();
}

