import { getAllProducts } from "./home.js";
import { createCard } from "./createCart.js";
import { setLocalStorage, getLocalStorage } from "./localStorage.js";

export async function createUserCard(
  cartName = "Delete",
  style = "btn-danger",
  handleEvent = deleteFromCart
) {
  const cardOrder = document.getElementById("card-order");
  let cart = getLocalStorage();

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
  let cart = getLocalStorage();
  cart = cart.filter((item) => item.id !== prodID);

  if (confirm("Want to delete?")) {
    setLocalStorage(cart);
    e.target.parentNode.parentNode.parentNode.remove();
  }
}

  // Total price for all product in cart
function sumTotalPrice(cart) {

  const price = cart.map((el) => el.price);
  const totalValue = price.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const totalPrice = document.querySelector(".total-price");
  const totalText = document.createElement("h4");
  totalText.innerHTML = `$ ${totalValue}`;
  totalPrice.appendChild(totalText);
}
