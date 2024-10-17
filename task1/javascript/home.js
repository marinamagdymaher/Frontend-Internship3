import { createCard } from "./createCart.js";
import { getAllUsers, setAllUsers } from "./localStorage.js";

export const getAllProducts = async () => {
  const apiUrl = "https://dummyjson.com/products";
  const response = await fetch(apiUrl);
  const products = await response.json();
  return products.products.map((prod) => ({id: prod.id, title: prod.title, image: prod.images[0], price: prod.price, category: prod.category }))
};

const displayPageContent = async () => {
  const products = await getAllProducts();
  displayProducts(products);
  displayCategories(products);
};

document.addEventListener("DOMContentLoaded", () => {
  displayPageContent();
});

function displayCategories(
  products,
  cartName = "Add To Cart",
  style = "btn-primary",
  handleEvent = addToCart
) {
  const cardCategory = document.querySelector(".single-category");
  const cardProduct = document.querySelector(".single-product");

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
  const cardProduct = document.querySelector(".single-product");
  cardProduct.innerHTML = "";

  if (products.length === 0) {
    cardProduct.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach((prod) => {
    const card = createCard(prod, cartName, style, handleEvent);
    cardProduct.appendChild(card);
  });
}

export async function addToCart(e, prodID) {
  const products = await getAllProducts();
  const currentProduct = products.find((prod) => prod.id === prodID);

  const users = getAllUsers();
  const currentUser = users.find((user) => user.isLoggedIn === true);


  if (!currentUser) {
    alert("Please create new account to add product to your cart");
    return;
  }


  const currentProductExistInUserCart = currentUser.cart.find(
    (item) => item.id === prodID
  );

  if (!currentProductExistInUserCart) {
    currentProduct.quantity = 1
    currentUser.cart.push(currentProduct); // Spread currentProduct to keep its properties
  } else {
    // If the product exists, increment the quantity
    currentProductExistInUserCart.quantity++;
  }

  // Save the updated users array back to local storage
  setAllUsers(users);

  alert("Added to cart successfully!");
}
