import { setLocalStorageUser, getLocalStorageUser } from "./localStorage.js";




function logOutButton(){
  const logout = document.getElementById("logout")
  let logOutButton = document.createElement("button")
  // logOutButton.className = "log-out-button"
  logOutButton.innerText = "Log Out"
  logout.appendChild(logOutButton)
  logOutButton.addEventListener('click', e=>{
    localStorage.clear() // We clear localStorage like so
  })
 }
 