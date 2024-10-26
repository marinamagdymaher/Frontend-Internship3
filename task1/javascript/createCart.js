export function createCard(prod, cartName, style,handleEvent) {
  const card = document.createElement("div");
  // card.classList.add("col","col-sm-3","col-md");
  card.classList.add("col");
  card.innerHTML = `
<div class="card text-center" style="width: 15rem; height: 28rem;">
  <img src="${prod.image}" alt="${prod.title}" class="card-img-top img-fluid" 
  style="width: 100%; height: 12rem; object-fit: contain;" />
  <div class="card-body mt-auto">
    <h5 class="card-title">${prod.title}</h5>
    <h6 class="card-title"> Rate:${prod.rating}</h6>
    <p class="card-text font-weight-bold">$ ${prod.price}</p>
    <p class="card-text font-weight-bold"> ${prod.quantity || ""} </p>
    <a class="btn ${style}">${cartName}</a>
    
  </div>
</div>`;
  // onclick="addToCart(${prod.id})"
  // card.querySelector(".btn").addEventListener("click",handleEvent);
  card
    .querySelector(".btn")
    .addEventListener("click", (e) => handleEvent(e, prod.id));

  return card;
}
