import { elements } from "./modules/elements.js";
import {
  displayRegister,
  displayLogin,
  printPage,
  renderAuth,
} from "./modules/ui-functions.js";
import {
  register,
  login,
  logoutUser,
  getBooks,
} from "./modules/api-functions.js";
getBooks();
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
