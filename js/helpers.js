export const elements = {
  form: document.querySelector("form"),
  searchInput: document.querySelector("form input"),
  resultsList: document.querySelector(".results"),
  recipeArea: document.querySelector(".recipe"),
  likeList: document.querySelector(".list"),
  basketList: document.querySelector(".shopping ul"),
  clearBtn: document.querySelector("#clear"),
};
// add/update localStorage data
export const setLocalStorage = (key, data) => {
  //convert data to string
  const strData = JSON.stringify(data);
  //save localStorage
  localStorage.setItem(key, strData);
};
// get element from localStorage
export const getFromLocal = (key) => {
  //get string data from local
  const strData = localStorage.getItem(key);
  return JSON.parse(strData);
};

// show clear cart button based on cart occupancy rate
export const controlBtn = (basket) => {
  // console.log(basket.length);
  if (basket.length > 0) {
    elements.clearBtn.style.display = "flex";
  } else {
    elements.clearBtn.style.display = "none";
  }
};
