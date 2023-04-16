import { elements } from "./modules/elements.js";
import {
  displayRegister,
  displayLogin,
  hideAll,
  renderIndex,
  renderBook,
  renderAuth,
  renderProfile,
} from "./modules/ui-functions.js";
import {
  register,
  login,
  logoutUser,
  getBooks,
  getBook,
  isLoggedIn,
  setRating,
  calcRating,
  checkRating,
} from "./modules/api-functions.js";

isLoggedIn();
hideAll();
renderIndex();

console.log("test Hejsan");

elements.authBtn.addEventListener("click", renderAuth);

elements.displayLogin.addEventListener("click", () => {
  console.log("hejsan");
});
elements.logoutBtn.addEventListener("click", logoutUser, (e) => {
  console.log("test logout");
});

elements.indexPage.addEventListener("click", (e) => {
  let target = e.target;
  console.log(target, "target");
  let targetId = target.closest("[data-id]");
  console.log(targetId, "using closest");

  if (targetId) {
    const id = targetId.dataset.id;
    console.log(id, "confusing");
    renderBook(id);
    // getBook(id);
  }
  // console.log(e.target.getAttribute("data-id"));
});

// document.getElementById("set-score").addEventListener("click", (e) => {
//   setRating();
// });

document.getElementById("check-score").addEventListener("click", (e) => {
  checkRating();
  renderBook(elements.bookPage.dataset.id);
});

// document.getElementById("entry-form").style.display = "none";

// elements.

// document.getElementById("main").addEventListener("click", (e) => {
//   console.log(e.target);
// });

//event listener for all the books, which will show the clicked book

// elements.displayLogin.addEventListener("click", displayLogin);
// elements.displayRegister.addEventListener("click", displayRegister);
// elements.loginBtn.addEventListener("click", login);
// elements.registerBtn.addEventListener("click", register);
