export function getAllUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  return users;
}

export function setAllUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// export function getUserCart(){
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   return cart;
// }

// export function setUserCart(cart) {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }


