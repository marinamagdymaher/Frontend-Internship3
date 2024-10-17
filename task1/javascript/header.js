import { getAllUsers, setAllUsers } from "./localStorage.js";

export function findUser() {
  const users = getAllUsers();
  const currentUserLogIn = users.find((user) => user.isLoggedIn === true);
  return currentUserLogIn;
}

function currentUserName() {
  const currentUser = findUser();

  const userName = document.getElementById("userName");
  let h3 = document.createElement("h3");

  if (currentUser) {
    h3.innerHTML = `${currentUser.name}`;
  } else {
    h3.innerHTML = "Guest";
  }
  userName.appendChild(h3);
}

currentUserName();

function logOutButton() {
  const logout = document.getElementById("logout");
  let logOutButton = document.createElement("button");
  logOutButton.className = "btn-style";
  logOutButton.innerText = "Log Out";
  logout.appendChild(logOutButton);

  logOutButton.addEventListener("click", () => {
    localStorage.removeItem("sessionToken");

    let users = getAllUsers();

    const currentUser = findUser();

    if (currentUser) {
      currentUser.isLoggedIn = false;

      users = users.map((user) =>
        user.email === currentUser.email ? currentUser : user
      );

      setAllUsers(users);
      console.log("Log Out successfully");
    }

    logOutButton.disabled = true; // Disable the button after click
    window.location.href = "logout.html";
  });
}

logOutButton();
