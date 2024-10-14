import { createCard } from "./createCart.js";
import {
  getLocalStorage,
  setLocalStorage,
  getLocalStorageUser,
} from "./localStorage.js";

const cardProduct = document.querySelector(".single-product");

export const getAllProducts = async () => {
  const apiUrl = "https://fakestoreapi.com/products";
  const response = await fetch(apiUrl);
  const products = await response.json();
  return products;
};

const displayPageContent = async () => {
  const products = await getAllProducts();
  displayProducts(products);
  displayCategories(products);
};

displayPageContent();

function displayCategories(
  products,
  cartName = "Add To Cart",
  style = "btn-primary",
  handleEvent = addToCart
) {
  const cardCategory = document.querySelector(".single-category");

  const displayAllProduct = document.createElement("div");
  displayAllProduct.classList.add("col-6", "col-md", "card");
  displayAllProduct.innerHTML = `<p class="text-capitalize">All Product</p>`;
  displayAllProduct.addEventListener("click", () => displayProducts(products));
  // Clear previous content if any
  cardCategory.innerHTML = "";

  cardCategory.appendChild(displayAllProduct);
  // Create a Set to avoid duplicates
  const categories = new Set(products.map((prod) => prod.category));

  categories.forEach((category) => {
    const circleCategory = document.createElement("div");

    circleCategory.classList.add("col-6", "col-md", "card"); // Add column class for layout

    // Add click event to filter products by category
    circleCategory.addEventListener("click", function () {
      const filteredProducts = products.filter(
        (item) => item.category === category
      );
      // Ensure this returns an array
      // Check if filteredProducts is an array and has items
      if (Array.isArray(filteredProducts) && filteredProducts.length > 0) {
        // Clear the previous products before displaying new ones
        cardProduct.innerHTML = "";

        // Create and append cards for the filtered products
        filteredProducts.forEach((item) => {
          const card = createCard(item, cartName, style, handleEvent);
          cardProduct.appendChild(card);
        });
      } else {
        // If no products found, display a message or handle this case
        console.log("No products found for this category.");
        cardProduct.innerHTML =
          "<p>No products available for this category.</p>";
      }
    });

    circleCategory.innerHTML = `
        <p class="text-capitalize">${category}</p>
      `;
    cardCategory.appendChild(circleCategory);
  });
}

function displayProducts(
  products,
  cartName = "Add To Cart",
  style = "btn-primary",
  handleEvent = addToCart
) {
  cardProduct.innerHTML = "";
  products.forEach((prod) => {
    const card = createCard(prod, cartName, style, handleEvent);
    cardProduct.appendChild(card);
  });
}

export async function addToCart(e, prodID) {
  const products = await getAllProducts();
  const currentProduct = products.find((prod) => prod.id === prodID);
  let cart = getLocalStorage();

  const currentProductExistInLocalStorage = cart.find(
    (item) => item.id === prodID
  );

  if (!currentProductExistInLocalStorage) {
    currentProduct.quantity = 1;
    cart.push(currentProduct);
  } else {
    currentProductExistInLocalStorage.quantity++;
  }
  setLocalStorage(cart);
  alert(`Add to cart succesfully!`);
}

function logOutButton() {
  const logout = document.getElementById("logout");
  let logOutButton = document.createElement("button");
  // logOutButton.className = "log-out-button"
  logOutButton.innerText = "Log Out";
  logout.appendChild(logOutButton);
  logOutButton.addEventListener("click", (e) => {
    localStorage.removeItem("sessionToken");
    window.location.href = "logout.html";
  });
}

logOutButton();

function userName() {
  const userName = document.getElementById("userName");
  let h3 = document.createElement("h3");
  // logOutButton.className = "log-out-button"
  let users = getLocalStorageUser();
  console.log(users);
  const currentUser = users.map((el) => el.name);
  h3.innerHTML = `${currentUser}`;
  userName.appendChild(h3);
}

userName();
