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

//renders the login/register page
export async function renderAuth() {
  
  //clear everything aside from the header

  //display the login/register options
  //upon success, Write a welcome message with name, adjusted for option
  //"redirect", aka clear and render main page with updated header for login/profile
}

//renders the profile page
export async function renderProfile() {
  //clear everything aside from the header
  //take the stored id and jwt token and fetch the user
  // fetch the items from reading list
  //either fetch them one by one or all at once

  //api function for fetching user
  //api function for fetchign reading list items with users ID
}

//renders the main page
export async function renderMain() {
  //clear everything aside from the header
  //fetch all books
  //display them in a grid-like fashion
}

//renders the selected book page
export async function renderBook() {
  //clear everything aside from the header

  //take the selected book and render all relevant info

   //api function for fetchign selected book with clicked id
   //api function for fetching ratings
   //api function for sending a users rating
   //function for calculating average rating


}
