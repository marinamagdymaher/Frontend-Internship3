export function getLocalStorage(username) {
  let cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
  return cart;
}

// Set the cart for a specific user
export function setUserCart(username, cart) {
  localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
}

// Function to get the currently logged-in user
export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

// Function to set the logged-in user
export function setLoggedInUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}