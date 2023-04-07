import { elements } from "./modules/elements.js";
import {
  displayRegister,
  displayLogin,
  printPage,
} from "./modules/ui-functions.js";
import {
  register,
  login,
  createTodo,
  logoutUser,
} from "./modules/api-functions.js";

console.log("hejsan");

// elements.
elements.displayLogin.addEventListener("click", displayLogin);

elements.displayRegister.addEventListener("click", displayRegister);

elements.loginBtn.addEventListener("click", login);

elements.registerBtn.addEventListener("click", register);
