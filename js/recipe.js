import { elements, getFromLocal, setLocalStorage } from "./helpers.js";

export class Recipe {
  constructor() {
    this.likes = getFromLocal("likes") || [];
    // all information about the recipe
    this.info = {};
    // ingredients of the recipe
    this.ingredients = [];

    this.renderLikes();
  }

  //get recipe information
  async getRecipe(id) {
    // console.log(id);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    //process data
    const data = await res.json();
    // import into class
    this.info = data.recipe;
    this.ingredients = data.recipe.ingredients;
  }

  createIngredient() {
    const html = this.ingredients
      .map(
        (ingredient) =>
          `<li>
            <i class="bi bi-check-circle"></i>
            <p>${ingredient}</p>
        </li>`
      )
      .join("");
    return html;
  }
  //transferring recipe information to the screen
  renderRecipe(recipe) {
    const markup = `
      <figure>
            <img src="${recipe.image_url}" alt="" />
            <h1>${recipe.title}</h1>
            <p class="like-area">
              <i class="bi ${
                this.isRecipeLike() ? "bi-heart-fill" : "bi-heart"
              }" id="like-btn"></i>
            </p>
      </figure>

      <div class="ingredients">
        <ul>
         ${this.createIngredient()}
        </ul>
        <button id="add-to-basket">
          <i class="bi bi-cart-fill"></i>
          <span>Add to Shopping Cart</span>
        </button>
      </div>

    <div class="directions">
      <h2>How to Cook</h2>
      <p>
      This recipe was carefully prepared by <span>${
        recipe.publisher
      }</span> tSearch.
      prepared and tested. More detailsSearch their website
      You can access via
      </p>
      <a href="${recipe.publisher_url}" target="_blank">Instruction</a>
    </div>


    `;
    elements.recipeArea.innerHTML = markup;
  }
  // check if the product has been liked before
  isRecipeLike() {
    const found = this.likes.find((i) => i.id === this.info.recipe_id);

    return found;
  }
  //controls liking events
  controlLike() {
    //get the values ​​we need for the liked product
    const newObject = {
      id: this.info.recipe_id,
      img: this.info.image_url,
      title: this.info.title,
    };
    // works if the element has been added before
    if (this.isRecipeLike()) {
      // remove the element from the likes array.
      this.likes = this.likes.filter((i) => i.id !== newObject.id);
    } else {
      // adds to the likes array
      this.likes.push(newObject);
    }

    setLocalStorage("likes", this.likes);

    // We ran Search to keep the face updated
    this.renderRecipe(this.info);

    // update html
    this.renderLikes();
  }

  renderLikes() {
    const html = this.likes
      .map(
        (item) => ` 
      <a href="#${item.id}">
        <img src="${item.img}" alt="" />
        <p>${item.title}</p>
      </a>`
      )
      .join("");
    elements.likeList.innerHTML = html;
  }
}
