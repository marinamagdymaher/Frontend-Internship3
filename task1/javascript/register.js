import { setLocalStorageUser, getLocalStorageUser } from "./localStorage.js";

const register = document.getElementById("register");
register.addEventListener("click", store);

// function getLocalStorageUser() {
//   let users = JSON.parse(localStorage.getItem("users")) || [];
//   return users;
// }

// function setLocalStorageUser(users) {
//   return localStorage.setItem("users", JSON.stringify(users));
// }

function store() {
  console.log("object");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pw").value;

  if (email === "" || password === "" || name === "") {
    alert("Please fill out both the email and password fields.");
    return;
  }

  let allUsers = getLocalStorageUser();

  console.log("Email:", email);

  console.log("Password:", password);
  console.log("name:", name);
  allUsers.push({ name, email, password });

  setLocalStorageUser(allUsers);
  alert("Account created successfully!");
  console.log(allUsers);
  window.location.href = "login.html";
}
