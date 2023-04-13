import { elements } from "./elements.js";
import { getBooks, getBook } from "./api-functions.js";

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
export function renderAuth() {
  console.log("hejsanaa");
  // document.getElementById("entry-form").style.display = "inherit";

  elements.main.innerHTML = `
  <div id="entry-form">
  <div class="buttons">
      <button class="Login" id="display-login"> Login</button>
      <button class=" Register" id="display-register">Register</button>
  </div>
  <div class="inputs">
      <div class="Name" id="username-div">
          <label for="username-input">Name</label>
          <input type="text" class="Name" name="Name" id="username-input" placeholder="name">
      </div>
      <div class="Password" id="password-div">
          <label for="password-input">Password</label>
          <input type="password" class="Password" name="Password" id="password-input">

      </div>
      <div class="Mail" id="mail-div" style="display:none">
          <label for="Mail"> Mail</label>
          <input type="text" name="Mail" class="Mail" id="mail-input">
      </div>
  </div>




  <button class="login-register" id="submit-login">Login</button>
  <button class="login-register" id="submit-register" style="display:none">Register</button>
</div>

  `;
  addEvents();
  //clear everything aside from the header
  //display the login/register options
  //upon success, Write a welcome message with name, adjusted for option
  //"redirect", aka clear and render main page with updated header for login/profile
}

function addEvents() {
  elements.displayLogin.addEventListener("click", displayLogin);
  elements.displayRegister.addEventListener("click", displayRegister);
  elements.loginBtn.addEventListener("click", login);
  elements.registerBtn.addEventListener("click", register);
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
export async function renderIndex() {
  //clear everything aside from the header
  //fetch all books
  let data = await getBooks();
  //display them in a grid-like fashion

  console.log(data.data);
  data.data.forEach((book) => {
    console.log(book);
    console.log(book.attributes.title);
    if (book.attributes.book_cover.data !== null) {
      let divvy = document.createElement("div");
      divvy.id = book.attributes.title;
      divvy.dataset.id = book.id;
      let title = document.createElement("h2");
      title.innerText = book.attributes.title;
      let cover = document.createElement("img");
      cover.src =
        "http://localhost:1337" +
        book.attributes.book_cover.data.attributes.formats.small.url;
      document.getElementById("all-books").appendChild(divvy);
      document.getElementById(book.attributes.title).appendChild(title);
      document.getElementById(book.attributes.title).appendChild(cover);
    }
  });
}

//renders the selected book page
export async function renderBook(id) {
  //clear everything aside from the header
  //take the selected book and render all relevant info
  let book = await getBook(id);

  console.log(book, "booken");
  console.log(book.attributes.title);

  let divvy = document.createElement("div");
  divvy.id = book.id;
  divvy.dataset.id = book.id;
  console.log(book.id);
  let title = document.createElement("h2");
  title.innerText = book.attributes.title;
  let cover = document.createElement("img");
  cover.src =
    "http://localhost:1337" +
    book.attributes.book_cover.data.attributes.formats.small.url;
  document.getElementById("book-cover").appendChild(divvy);
  document.getElementById(book.id).appendChild(title);
  document.getElementById(book.id).appendChild(cover);
  //api function for fetchign selected book with clicked id
  //api function for fetching ratings
  //api function for sending a users rating
  //function for calculating average rating
}

export function hideAll() {
  elements.indexPage.style.display = "none";
  elements.profilePage.style.display = "none";
  elements.authPage.style.display = "none";
  elements.bookPage.style.display = "none";
}
