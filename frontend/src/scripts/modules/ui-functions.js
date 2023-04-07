import { elements } from "./elements.js";
import { getTodosForUser } from "./api-functions.js";

export function displayRegister() {
  document.getElementById("mail").style = "display:block";
  document.getElementById("submit-register").style = "display:block";
  document.getElementById("submit-login").style = "display:none";
}
export function displayLogin() {
  document.getElementById("mail").style = "display:none";
  document.getElementById("submit-register").style = "display:none";
  document.getElementById("submit-login").style = "display:block";
}

export async function printPage() {
  if (sessionStorage.getItem("token")) {
    entryForm.style = "display:none";
    todoArea.style = "display:block";
    let userID = sessionStorage.getItem("userID");
    logoutBtn.style = "display:block";
    await getTodosForUser(userID);
  } else {
    logoutBtn.style = "display:none";
    todoArea.style = "display:none";
    entryForm.style = "display:block";
  }
}

export function clearInput() {
  Mailet.value = "";
  Usernamet.value = "";
  Pwet.value = "";
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
