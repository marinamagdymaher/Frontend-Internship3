export function getLocalStorage() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

export function setLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getLocalStorageUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  return users;
}

export function setLocalStorageUser(users, sessionToken) {
  localStorage.setItem("users", JSON.stringify(users));
  if (sessionToken) {
    localStorage.setItem("sessionToken");
  }
}




