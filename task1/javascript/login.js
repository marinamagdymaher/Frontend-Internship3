import { setLocalStorageUser, getLocalStorageUser } from "./localStorage.js";

const loginUser = document.getElementById("login");
loginUser.addEventListener("click", handleLogin);


function handleLogin() {
  let emailLogin = document.getElementById("email-login").value.trim();
  let passwordLogin = document.getElementById("password-login").value.trim();

  let users = getLocalStorageUser();

  const currentUser = users.find(
    (user) => user.email === emailLogin && user.password === passwordLogin
  );
  console.log(currentUser);
  // Check if user exists
  if (!currentUser) {
    alert("Incorrect email or password. Please try again.");
  } else {
    // If login is successful, redirect to home page
    window.location.href = "home.html";
    console.log("login successfully");
  }
}







// function login() {
//   console.log("first");
//   let emailLogin = document.getElementById("email-login").value.trim();
//   let passwordLogin = document.getElementById("password-login").value.trim();

//   let users = getLocalStorageUser();

//   console.log("Entered Email:", emailLogin);
//   console.log("Entered Password:", passwordLogin);
//   console.log("Stored Users:", users);

//   const currentUser = users.find((user) => user.email === emailLogin);
//   console.log(currentUser);
//   // Check if user exists
//   if (!currentUser) {
//     alert("Incorrect email or password. Please try again.");
//   } else {
//     // If login is successful, redirect to home page
//     window.location.href = "home.html";
//   }
// }