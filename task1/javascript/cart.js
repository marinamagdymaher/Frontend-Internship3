import { createCard } from "./createCart.js";
import { setAllUsers, getAllUsers } from "./localStorage.js";

export async function createUserCard(
  cartName = "Delete",
  style = "btn-danger",
  handleEvent = deleteFromCart
) {
  const cardOrder = document.getElementById("card-order");

  const users = getAllUsers();

  const currentUser = users.find((loginUser) => loginUser.isLoggedIn === true);


  const cart = currentUser.cart;

  if (!currentUser) {
    alert("No user logged in. Please log in to view your cart.");
    return;
  }

  cardOrder.innerHTML = "";

  if (cart.length === 0) {
    const emptyMessage = document.createElement("h3");
    emptyMessage.innerHTML = "Your cart is empty.";
    cardOrder.appendChild(emptyMessage);
    return; // Exit the function
  }

  // Total price for all product in cart
  sumTotalPrice(cart);

  cart.forEach((element) =>
    cardOrder.appendChild(createCard(element, cartName, style, handleEvent))
  );
}

createUserCard();

function deleteFromCart(e, prodID) {
  const users = getAllUsers();

  const currentUser = users.find((loginUser) => loginUser.isLoggedIn === true);

  const cart = currentUser.cart;

  const updatedCart = cart.filter((item) => item.id !== prodID);

  if (confirm("Want to delete?")) {
    currentUser.cart = updatedCart;
    // Update the users array with the updated current user
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? currentUser : user
    );


    setAllUsers(updatedUsers);
    sumTotalPrice(updatedCart);

    // Remove the item from the DOM
    e.target.parentNode.parentNode.parentNode.remove();
  }
}



// Total price for all product in cart
function sumTotalPrice(cart) {

  let totalProductsPrice = 0;
  cart.forEach((item) => {
    totalProductsPrice += item.price * item.quantity;
  });
  const totalPrice = document.querySelector(".total-price");

  const totalText = document.querySelector(".total-price h4");
  totalText.innerHTML = `Total Price: $ ${totalProductsPrice.toFixed(2)}`;
  totalPrice.appendChild(totalText);

  if (cart.length === 0) {
    const cardOrder = document.getElementById("card-order");
    const emptyMessage = document.createElement("h3");

    totalPrice.innerHTML = "";

    emptyMessage.innerHTML = "Your cart is empty.";
    cardOrder.appendChild(emptyMessage);
    return
  }
}
