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
  getAndSetTheme,
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
getAndSetTheme();

console.log("in a branch");

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


const averageRating = 3;





// document.querySelector(".rating").addEventListener("click", (e) => {
//     // window.confirm("Do you really want to vote?")
//     checkRating(elements.bookPage.dataset.id);
//     // renderBook(elements.bookPage.dataset.id);
//   });

// document.getElementById("entry-form").style.display = "none";

// elements.

// document.getElementById("main").addEventListener("click", (e) => {
//   console.log(e.target);
// });

//event listener for all the books, which will show the clicked book

// })

//funktion som kommer att hämta rated of reading
//på någotvis kolla och spara hur listorna ska visas, och i vilken ordning
//skriva en funktion som sorterar
//sorta listorna
//använda listorna som argument till renderProfile

//temp place for adding event listeners to tables

// event listeners for ratinglist theads
document.getElementById("rated-list-title").addEventListener("click", () => {
  sortAndRender("title", "right");
});
document.getElementById("rated-list-author").addEventListener("click", () => {
  sortAndRender("author", "right");
});
document
  .getElementById("rated-list-avg-rating")
  .addEventListener("click", () => {
    sortAndRender("avgRating", "right");
  });
document
  .getElementById("rated-list-user-rating")
  .addEventListener("click", () => {
    sortAndRender("userRating", "right");
  });

// event listeners for reading list theads
document.getElementById("reading-list-title").addEventListener("click", () => {
  sortAndRender("title", "left");
});
document.getElementById("reading-list-author").addEventListener("click", () => {
  sortAndRender("author", "left");
});
document
  .getElementById("reading-list-avg-rating")
  .addEventListener("click", () => {
    sortAndRender("avgRating", "left");
  });
document
  .getElementById("reading-list-user-rating")
  .addEventListener("click", () => {
    sortAndRender("userRating", "left");
  });

//sortandrender will take a column as an argument for sorting, if it is falsy it will not sort, and pass the book arrays into renderProfile, the second argument is the table to render, which will render both by default, else a side if a side string is passed
