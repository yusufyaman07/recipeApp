import { elements } from "./helpers.js";
// transfers the results from the API to the screen
export const renderResult = (recipes) => {
  //   console.log(recipes);
  elements.resultsList.innerHTML = "";
  recipes.slice(0, 10).forEach((recipe) => {
    const markup = `
    <a href="#${recipe.recipe_id}" class="result-link">
        <img src="${recipe.image_url}" alt="" />
        <div class="data">
        <h4>${recipe.title}</h4>
        <p>${recipe.publisher}</p>
        </div>
    </a>
    `;
    // sending the html we created to the relevant place
    // elements.resultsList.innerHTML += markup;
    elements.resultsList.insertAdjacentHTML("beforeend", markup);
  });
};
// loading gif
export const renderLoader = (parent) => {
  // loader HTML
  const loader = `
        <div class="loader">
            <img src="./images/foodGif.gif" alt="" />
        </div>
  `;
  // sending the loader into the html element we receive
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const renderBasketItems = (items) => {
  const markup = items
    .map(
      (item) => `  
    <li data-id=${item.id}>
      <i class="bi bi-x" id="delete-item"></i>
      <span>${item.title}</span>
    </li>`
    )
    .join("");
  elements.basketList.innerHTML = markup;
};
