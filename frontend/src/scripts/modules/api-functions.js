import { elements } from "./elements.js";
import {
  displayRegister,
  displayLogin,
  registerMessage,
  clearInput,
  hideAll,
  renderIndex,
} from "./ui-functions.js";
const baseAPI = "http://localhost:1337/api/";
const header = { "Content-Type": "application/json" };

export function logoutUser() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userID");
  isLoggedIn();
  renderIndex();
  document.getElementById("active-user").innerText = "";
}

export async function isLoggedIn() {
  const token = sessionStorage.getItem("token");
  console.log(token, "where am i ");
  if (token !== null) {
    elements.logoutBtn.style.display = "inherit";
    elements.authBtn.style.display = "none";
    let userData = await getActiveUser();
    document.getElementById("active-user").innerText = userData.username;

    console.log(data, "hejsan svejsan");
  } else {
    elements.logoutBtn.style.display = "none";
    elements.authBtn.style.display = "inherit";
  }
}

export async function register() {
  try {
    let response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          username: elements.Usernamet.value,
          email: elements.Mailet.value,
          password: elements.Pwet.value,
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    console.log(data.user.username);

    registerMessage(data.user.username);
    clearInput();
  } catch (error) {
    console.error(error, "o no");
  }
}

export async function getBooks() {
  console.log("hej");
  const response = await fetch(
    "http://localhost:1337/api/books?populate=deep",
    {
      method: "GET",
      headers: header,
    }
  );
  const data = await response.json();

  console.log("done");
  return data;
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
    alert("welcome");
    hideAll();
    isLoggedIn();
    renderIndex();
    document.getElementById("active-user").innerText = userData.username;
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
  let userRes = await fetch("http://localhost:1337/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  let userData = await userRes.json();
  return userData;
}

export async function getBook(id) {
  console.log("hej");
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

export async function setRating() {
  // const bookID = targetId.dataset.id
  const authToken = sessionStorage.getItem("token");
  const userID = sessionStorage.getItem("userID");
  try {
    const response = await fetch("http://localhost:1337/api/user-ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          rating: document.getElementById("user-score").value,
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

export async function changeRating(ratingID) {
  // console.log(userRating, userID);
  const authToken = sessionStorage.getItem("token");
  const response = await fetch(
    "http://localhost:1337/api/user-ratings/" + ratingID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          rating: document.getElementById("user-score").value,
         
        },
      }),
    }
  );
  console.log(response);
}

export async function checkRating() {
  const userID = sessionStorage.getItem("userID");
  let chosenBook = elements.bookPage.dataset.id;
  try {
    const response = await fetch(
      `http://localhost:1337/api/books/${chosenBook}?populate=user_rating.user`
    );
    const bookData = await response.json();

    //array with all of the ratings of selected book
    let ratedUsers = bookData.data.attributes.user_rating.data;

    //if users id is found, then they have already set rating before, stores the rating
    let hasRated = ratedUsers.find((element) => {
      return element.attributes.user.data.id === +userID;
    });

    console.log(hasRated, "rating object");

    if (hasRated) {
      console.log(true, "has rated");
      const ratingID = hasRated.id;
      console.log(ratingID);
      changeRating(ratingID);
    } else console.log(false, "has not rated book");
  } catch (error) {
    console.error("Error in setRating function:", error);
    throw error;
  }
}

// export async function setRating(ratings) {
//   console.log(ratings.length());
// }

export async function calcRating(ratings) {
  console.log(ratings.length());
}

