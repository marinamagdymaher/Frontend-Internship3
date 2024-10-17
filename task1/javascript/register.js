import { getAllUsers, setAllUsers } from "./localStorage.js";

const register = document.getElementById("register");
register.addEventListener("click", store);

function store() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pw").value;

  if (email === "" || password === "" || name === "") {
    alert("Please fill out the name, email, and password fields.");
    return;
  }

  const allUsers = getAllUsers();
  const newUser = allUsers.find((user) => user.email === email);



  if (newUser) {
    alert(
      "An account with this email already exists. Please try with a different email."
    );
    return;
  }

  let cart = [];
  const isLoggedIn = false;
  const id = Date.now();

  allUsers.push({ id, name, email, password, isLoggedIn, cart });

  setAllUsers(allUsers);
  alert("Account created successfully!");

  window.location.href = "login.html";
}
