import { getAllUsers, setAllUsers } from "./localStorage.js";


const loginUser = document.getElementById("login");
loginUser.addEventListener("click", handleLogin);

function handleLogin(event) {
  event.preventDefault();
  const emailLogin = document.getElementById("email-login").value.trim();
  const passwordLogin = document.getElementById("password-login").value.trim();

  const users = getAllUsers();


  if (!Array.isArray(users)) {
    console.error("Users is not an array", users);
    return;
  }

  const currentUser = users.find(
    (user) => user.email === emailLogin && user.password === passwordLogin
  );


  // Check if user exists
  if (!currentUser) {
    alert("Incorrect email or password. Please try again.");

    return;
  } else {
    // If login is successful, redirect to home page
    console.log("login successfully");
    currentUser.isLoggedIn = true;
    setAllUsers(users)
    window.location.href = "home.html";
  }
}
