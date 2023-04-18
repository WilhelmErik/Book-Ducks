import { elements } from "./modules/elements.js";
import {
  displayRegister,
  displayLogin,
  hideAll,
  renderIndex,
  renderBook,
  renderAuth,
  renderProfile,
  sortAndRender,
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

elements.submitScore.addEventListener("click", (e) => {
  // window.confirm("Do you really want to vote?")
  checkRating(elements.bookPage.dataset.id);
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

// anArray.sort((a,b)=>{
//   a -b ; //if a is less than b , return -1
//   //if the result is negative, a must be less than b and thus be placed before it in the array

// })

//funktion som kommer att hämta rated of reading
//på någotvis kolla och spara hur listorna ska visas, och i vilken ordning
//skriva en funktion som sorterar
//sorta listorna
//använda listorna som argument till renderProfile

//temp place for adding event listeners to tables
document.getElementById("rated-list-title").addEventListener("click", () => {
  sortAndRender("title");
});
document.getElementById("rated-list-author").addEventListener("click", () => {
  sortAndRender("author");
});
document
  .getElementById("rated-list-avg-rating")
  .addEventListener("click", () => {
    sortAndRender("avgRating");
  });

document.getElementById("reading-list-title").addEventListener("click", () => {
  sortAndRender("title");
});
document.getElementById("reading-list-author").addEventListener("click", () => {
  sortAndRender("author");
});
document
  .getElementById("reading-list-avg-rating")
  .addEventListener("click", () => {
    sortAndRender("avgRating");
  });
document
  .getElementById("rated-list-user-rating")
  .addEventListener("click", () => {
    sortAndRender("userRating");
  });
