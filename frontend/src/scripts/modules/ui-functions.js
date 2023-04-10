import { elements } from "./elements.js";
import { getTodosForUser, getBooks } from "./api-functions.js";

export function displayRegister() {
  elements.mailDiv.style = "display:block";
  elements.registerBtn.style = "display:block";
  elements.loginBtn.style = "display:none";
  console.log("register");
  getBooks();
}
export function displayLogin() {
  elements.mailDiv.style = "display:none";
  elements.registerBtn.style = "display:none";
  elements.loginBtn.style = "display:block";
  console.log("login");
  getBooks();
}

export async function printPage() {
  if (sessionStorage.getItem("token")) {
    entryForm.style = "display:none";
    todoArea.style = "display:block";
    let userID = sessionStorage.getItem("userID");
    logoutBtn.style = "display:block";
    // await getTodosForUser(userID);
  } else {
    logoutBtn.style = "display:none";
    todoArea.style = "display:none";
    entryForm.style = "display:block";
  }
}

export function clearInput() {
  elements.Mailet.value = "";
  elements.Usernamet.value = "";
  elements.Pwet.value = "";
}

export function registerMessage(name) {
  document.getElementById("entry").style = "visibility:hidden";
  document.getElementById("h1-title").innerText = "Welcome " + name + "!";
  document.getElementById("h2-title").innerText = " Please login";
  setTimeout(() => {
    document.getElementById("entry").style = "visibility:visible";
    document.getElementById("h1-title").innerText = "Strapi to-dos";
    document.getElementById("h2-title").innerText = "Please login or register";
  }, 2000);
}
