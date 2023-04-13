import { elements } from "./modules/elements.js";
import {
  displayRegister,
  displayLogin,
  printPage,
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
} from "./modules/api-functions.js";

renderIndex();

console.log("test Hejsan");

// document.getElementById("entry-form").style.display = "none";

// elements.
elements.authBtn.addEventListener("click", renderAuth);

// elements.displayLogin.addEventListener("click", displayLogin);
// elements.displayRegister.addEventListener("click", displayRegister);
// elements.loginBtn.addEventListener("click", login);
// elements.registerBtn.addEventListener("click", register);

elements.displayLogin.addEventListener("click", () => {
  console.log("hejsan");
});
elements.logoutBtn.addEventListener(
  "click",
  // logoutUser
  (e) => {
    console.log("test logout");
  }
);

document.getElementById("main").addEventListener("click", (e) => {
  console.log(e.target);
});

elements.indexPage.addEventListener("click", (e) => {
  let target = e.target;
  console.log(target, "target");
  let targetId = target.closest("[data-id]");
  console.log(targetId, "using closest");

  if (targetId) {
    const id = targetId.dataset.id;
    console.log(id, "confusing");
    renderBook(id)
    // getBook(id);
  }
  // console.log(e.target.getAttribute("data-id"));
});
