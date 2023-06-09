import { elements } from "./elements.js";
import {
  displayRegister,
  displayLogin,
  registerMessage,
  clearInput,
  hideAll,
  renderIndex,
  renderProfile,
  renderBook,
  renderAuth,
  sortAndRender,
} from "./ui-functions.js";
const baseAPI = "http://localhost:1337/api/";
const header = { "Content-Type": "application/json" };

export function logoutUser() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userID");
  isLoggedIn();
  hideAll();
  renderIndex();
  elements.activeUser.innerText = "";
  // elements.readingList.innerHTML = "";
  document.getElementById("reading-list-tbody");
  elements.ratedList.innerHTML = "";
}

export async function isLoggedIn() {
  const token = sessionStorage.getItem("token");
  console.log(token, "where am i ");
  if (token !== null) {
    elements.logoutBtn.style.display = "inherit";
    elements.authBtn.style.display = "none";

    let userData = await getActiveUser();
    elements.activeUser.innerText = userData.username;

    //event listener for username
    elements.activeUser.addEventListener("click", (e) => {
      // renderProfile();
      hideAll();
      sortAndRender(false, "both");
      console.log("im being run alot eh");

      console.log("hej, lets do smth");
    });
    elements.addScore.style.display = "inherit";
    elements.addReading.style.display = "initial";
    document.getElementById("active-user").innerText =
      userData.username + " | Profile";
    // console.log(data, "hejsan svejsan");
    return true;
  } else {
    elements.logoutBtn.style.display = "none";
    elements.authBtn.style.display = "inherit";

    elements.addScore.style.display = "none";
    elements.addReading.style.display = "none";
    return false;
  }
}

export async function register() {
  try {
    let response = await fetch(baseAPI + "auth/local/register", {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        username: elements.Usernamet.value,
        email: elements.Mailet.value,
        password: elements.Pwet.value,
      }),
    });
    let data = await response.json();
    console.log(data);
    console.log(data.user.username);

    registerMessage(data.user.username);
    clearInput();
  } catch (error) {
    console.error(error, "o no");
  }
}

export async function login() {
  try {
    console.log(elements.Usernamet.value, elements.Pwet.value);
    let response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        identifier: elements.Usernamet.value,
        password: elements.Pwet.value,
      }),
    });

    let data = await response.json();
    console.log(data);

    console.log(data.user.id, "paus");

    sessionStorage.setItem("userID", data.user.id);
    sessionStorage.setItem("token", data.jwt);

    console.log(sessionStorage.getItem("token"), "Ett token");

    // let userRes = await fetch("http://localhost:1337/api/users/me", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${data.jwt}`,
    //   },
    // });

    let userData = await getActiveUser();
    console.log(userData, "data2");

    clearInput();
    // alert("welcome");
    hideAll();
    isLoggedIn();
    renderIndex();

    console.log(userData.username, " is logged in ");
  } catch (error) {
    console.error(
      "Error during authentication:",
      error,
      "lmfao, that aint right"
    );
  }
}

// document.getElementById("add-todo").addEventListener("click", async (e) => {
//   await createTodo();
// });

export async function getActiveUser() {
  let userRes = await fetch(baseAPI + "users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  let userData = await userRes.json();
  return userData;
}
export async function getBooks() {
  console.log("hej");
  const response = await fetch(baseAPI + "books?populate=deep", {
    method: "GET",
    headers: header,
  });
  const data = await response.json();

  console.log("done");
  return data;
}
export async function getBook(id) {
  console.log("hej på dig");
  // await getBookRatings(id);
  hideAll();
  elements.bookPage.style.display = "block";

  const response = await fetch(
    "http://localhost:1337/api/books/" + id + "?populate=deep",
    {
      method: "GET",
      headers: header,
    }
  );
  const data = await response.json();
  console.log(data.data);
  return data.data;
}

//------------------------------Rating functions----------------------------------
//set the active users chosen rating to the current book
export async function setRating() {
  // const bookID = targetId.dataset.id
  const authToken = sessionStorage.getItem("token");
  const userID = sessionStorage.getItem("userID");
  try {
    const response = await fetch(baseAPI + "user-ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          rating: document.querySelector('input[name="rating"]:checked').value,
          user: userID,
          book: elements.bookPage.dataset.id,
        },
      }),
    });

    const responseData = await response.json();
    console.log("works", responseData);
    return responseData;
  } catch (error) {
    console.error("Error in setRating function:", error);
    throw error;
  }
}
//Changes the active users chosen rating to the current book
export async function changeRating(ratingID) {
  // console.log(userRating, userID);
  const authToken = sessionStorage.getItem("token");
  const response = await fetch(baseAPI + "user-ratings/" + ratingID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      data: {
        rating: document.querySelector('input[name="rating"]:checked').value,
      },
    }),
  });
  console.log(response);
}

//checks if the active user has rated the book or not, calls function accordingly
export async function checkRating(chosenBook, returnRatingObject) {
  const userID = sessionStorage.getItem("userID");
  // let chosenBook = elements.bookPage.dataset.id;
  try {
    const response = await fetch(
      `${baseAPI}books/${chosenBook}?populate=user_rating.user`
    );
    const bookData = await response.json();

    //array with all of the ratings of selected book
    let ratedUsers = bookData.data.attributes.user_rating.data;

    //if users id is found, then they have already set rating before, stores the rating
    let hasRated = ratedUsers.find((element) => {
      return element.attributes.user.data.id === +userID;
    });

    console.log(hasRated, "rating object");
    if (returnRatingObject) return hasRated;

    if (hasRated) {
      console.log(true, "has rated");
      const ratingID = hasRated.id;
      changeRating(ratingID);
      console.log("chaning rating of ", ratingID);
    } else {
      console.log(false, "has not rated book");
      setRating();
    }

    // return hasRated;
  } catch (error) {
    console.error("Error in setRating function:", error);
    throw error;
  }
}

// export async function setRating(ratings) {
//   console.log(ratings.length());
// }

//function that should get all the books a user has rated
export async function getRatedBooks() {
  // console.log(ratings.length());
  const userID = sessionStorage.getItem("userID");
  const res = await fetch(
    `${baseAPI}users/${userID}?populate=book_ratings.book.book_cover`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  let data = await res.json();
  // console.log(data.book_ratings, "these are the books you have rated");
  return data.book_ratings;
}
// retrieves all ratings of chosen book
export async function getBookRatings(chosenBook) {
  const res = await fetch(`${baseAPI}books/${chosenBook}?populate=user_rating`);
  const data = await res.json();
  const userRatings = data.data.attributes.user_rating.data;
  // console.log(userRatings, "checking all the ratings");
  return userRatings;
}

export function calcRating(userRatings) {
  // console.log(userRatings, "inside calcrating");
  const rateAmount = userRatings.length;

  if (rateAmount === 0) {
    return { averageRating: 0, totalVoters: 0 };
  } else {
    let rateValues = userRatings.map((object) => {
      return object.attributes.rating;
    });

    let scoreTotal = rateValues.reduce((accum, current) => accum + current);
    // console.log(scoreTotal, "scoreTotal");
    let averageRating = scoreTotal / rateAmount;
    averageRating = parseFloat(averageRating.toFixed(2));
    // console.log(averageRating, "Average rating");
    // return averageRating;
    return { averageRating: averageRating, totalVoters: rateAmount };
    // console.log(ratings.length());
  }
}

//___________________________________________________________________________

//-----------------------------Readin List-----------------------------------

//Add book to a users readinglist

//get the books from users readinglist
export async function getReadingList() {
  try {
    const response = await fetch(
      `${baseAPI}users/me?populate=to_reads.book_cover`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();

    console.log(data, "What the books could look like");
    const readingList = data.to_reads;
    // console.log(readingList, "her babaeriba");
    return readingList;
  } catch (error) {
    console.error("Error fetching user reading list:", error);
  }
}

export async function setReadingList(chosenBook, userID) {
  const readingList = await getReadingList();
  console.log(readingList, "active users readinglist");
  if (!readingList.some((book) => book.id === chosenBook.id)) {
    readingList.push(chosenBook);
    const response = await fetch(`${baseAPI}users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        to_reads: readingList,
      }),
    });
  } else {
    console.log("Book is already in the reading list.", chosenBook);
  }
}
export async function removeFromReading(chosenBook) {
  //take the id from the selected book,
  //loop through the array to find selected book,
  const readinglist = await getReadingList();
  console.log(readinglist, "initial", readinglist.length);
  //filter it out
  let modifiedList = readinglist.filter((element) => {
    return element.id !== chosenBook;
  });
  console.log(modifiedList, "modified", modifiedList.length);

  //send the modified array back to readinglist
  const userID = sessionStorage.getItem("userID");
  const response = await fetch(`${baseAPI}users/${userID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      to_reads: modifiedList,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update reading list: ${response.statusText}`);
  }
  sortAndRender(false, "left");
  return await response.json();
}

//------------------------_______________------------------------------

export async function getTheme() {
  const res = await fetch(baseAPI + "theme");
  const data = await res.json();
  return data.data.attributes.scheme;
}
