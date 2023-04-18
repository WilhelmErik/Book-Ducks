import { elements } from "./elements.js";
import {
  getBooks,
  getBook,
  login,
  register,
  setRating,
  getBookRatings,
  calcRating,
  setReadingList,
  getReadingList,
  getRatedBooks,
  checkRating,
} from "./api-functions.js";

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

// export async function printPage() {
//   if (sessionStorage.getItem("token")) {
//     entryForm.style = "display:none";
//     todoArea.style = "display:block";
//     let userID = sessionStorage.getItem("userID");
//     logoutBtn.style = "display:block";
//     // await getTodosForUser(userID);
//   } else {
//     logoutBtn.style = "display:none";
//     todoArea.style = "display:none";
//     entryForm.style = "display:block";
//   }
// }

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
  hideAll();
  elements.authPage.style.display = "inherit";
  addAuthEvents();
  //clear everything aside from the header
  //display the login/register options
  //upon success, Write a welcome message with name, adjusted for option
  //"redirect", aka clear and render main page with updated header for login/profile
}

function addAuthEvents() {
  elements.displayLogin.addEventListener("click", displayLogin);
  elements.displayRegister.addEventListener("click", displayRegister);
  elements.loginBtn.addEventListener("click", login);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      login();
    }
  });

  elements.registerBtn.addEventListener("click", register);
}

//renders the profile page
export async function renderProfile(readingList, ratedList) {
  // const readingList = await getReadingList();
  // const ratedList = await getRatedBooks();

  ///

  console.log(readingList, "the list");
  hideAll();
  elements.ratedListBody.innerHTML = "";
  elements.readingListBody.innerHTML = "";
  console.log("i should only be here once");

  for (const book of readingList) {
    // const hasRated = await checkRating(book.id, true);
    // // console.log(hasRated, "has Rated???", hasRated.attributes.rating);
    // const ifRated = hasRated ? hasRated.attributes.rating : 0;
    const row = await printBookRow(book, book.userRating);
    document.getElementById("reading-list-tbody").appendChild(row);
  }
  // readingList.forEach(async (book) => {});

  // console.log(ratedList, "rated booook");

  for (const ratedBook of ratedList) {
    const row = await printBookRow(ratedBook.book, ratedBook.rating);
    document.getElementById("rated-list-tbody").appendChild(row);
  }

  // ratedList.forEach(async (ratedBook) => {});

  elements.profilePage.style.display = "grid";
  // elements.profilePage.style.alignItems = "start";
}

export async function printBookRow(book, rating) {
  const row = document.createElement("tr");

  const tdCover = document.createElement("td");
  const cover = document.createElement("img");
  cover.src = "http://localhost:1337" + book.book_cover.formats.thumbnail.url;
  cover.width = 50;
  tdCover.appendChild(cover);
  row.appendChild(tdCover);

  const tdTitle = document.createElement("td");
  tdTitle.innerText = book.title;
  row.appendChild(tdTitle);

  const tdAuthor = document.createElement("td");
  tdAuthor.innerText = book.author;
  row.appendChild(tdAuthor);

  const tdAvgRating = document.createElement("td");
  let ratings = await getBookRatings(book.id);
  let calced = calcRating(ratings);
  let { averageRating } = calced;

  tdAvgRating.innerText = averageRating;

  row.appendChild(tdAvgRating);

  if (rating) {
    const tdUserRating = document.createElement("td");
    tdUserRating.innerText = rating;
    row.appendChild(tdUserRating);
  }
  return row;
}

//renders the main page
export async function renderIndex() {
  //clear everything aside from the header
  //fetch all books
  elements.indexPage.style.display = "inherit";
  elements.allBooks.innerHTML = "";
  let data = await getBooks();
  //display them in a grid-like fashion

  console.log(data.data);
  data.data.forEach((book) => {
    // console.log(book);
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
      //not sure i want to display title on index
      // document.getElementById(book.attributes.title).appendChild(title);
      document.getElementById(book.attributes.title).appendChild(cover);
    }
  });
}

//renders the selected book page
export async function renderBook(id) {
  //clear everything aside from the header
  //take the selected book and render all relevant info
  hideAll();

  elements.bookCover.innerHTML = "";
  // elements.bookPage.style.display = "unset";
  // elements.bookPage.style.display = "none";
  let book = await getBook(id);
  elements.bookPage.dataset.id = book.id;
  console.log(book.attributes.user_ratings, "ratings");
  let ratings = await getBookRatings(id);
  let calced = calcRating(ratings);
  let { averageRating, totalVoters } = calced;

  console.log(
    averageRating,
    "average score from renderBook, of",
    totalVoters,
    "voters"
  );
  console.log(book, "booken");
  console.log(book.attributes.title);

  elements.addReading.addEventListener("click", () => {
    setReadingList(book, sessionStorage.getItem("userID"));
  });

  elements.bpTitle.innerText = book.attributes.title;
  elements.bpAuthor.innerText = book.attributes.author;
  elements.bpScore.innerText =
    "Average score:" + averageRating + " out of:" + totalVoters + " voters";
  elements.bpPages.innerText = "pages:" + book.attributes.pages;
  elements.bpPublished.innerText = "published:" + book.attributes.release_date;

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
  // document.getElementById(book.id).appendChild(title);
  document.getElementById(book.id).appendChild(cover);
  //api function for fetchign selected book with clicked id
  //api function for fetching ratings
  //api function for sending a users rating
  //function for calculating average rating
  elements.bookPage.style.display = "grid";
}

export function hideAll() {
  elements.indexPage.style.display = "none";
  elements.profilePage.style.display = "none";
  elements.authPage.style.display = "none";
  elements.bookPage.style.display = "none";
}
function clearAll() {
  elements.readingList.innerHTML = "";
  elements.ratedList.innerHTML = "";
}

// async function renderBookList() {}

export async function sortAndRender(column) {
  const readingList = await getReadingList();
  const ratedList = await getRatedBooks();

  // applying average rating of each book object instead of calculating while printing
  for (const book of readingList) {
    const ratings = await getBookRatings(book.id);
    const calced = calcRating(ratings);
    book.averageRating = calced.averageRating;

    const hasRated = await checkRating(book.id, true);
    const ifRated = hasRated ? hasRated.attributes.rating : 0;
    book.userRating = ifRated;
  }
  for (const ratedBook of ratedList) {
    const ratings = await getBookRatings(ratedBook.book.id);
    const calced = calcRating(ratings);
    ratedBook.book.averageRating = calced.averageRating;
    ratedBook.book.userRating = ratedBook.rating;
  }
  //get thje sorting function to be used in the .sort method
  if (column) {
    let sortFunction = getSortingFunction(column);
    readingList.sort((a, b) => sortFunction(a, b));
    ratedList.sort((a, b) => sortFunction(a.book, b.book));
  }
  console.log(readingList, ratedList, "testing things");

  renderProfile(readingList, ratedList);
}

//different functions that depending on whcih column user click, will return a sorting function to be passed into the .sort method

export function getSortingFunction(column) {
  if (column === "title") {
    return (a, b) => a.title.localeCompare(b.title);
  } else if (column === "author") {
    return (a, b) => a.author.localeCompare(b.author);
  } else if (column === "avgRating") {
    return (a, b) => b.averageRating - a.averageRating;
  } else if (column === "userRating") {
    return (a, b) => b.userRating - a.userRating;
  }
}
