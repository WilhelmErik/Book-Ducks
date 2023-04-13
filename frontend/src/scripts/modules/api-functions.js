import { elements } from "./elements.js";
import {
  displayRegister,
  displayLogin,
  printPage,
  registerMessage,
  clearInput,
  hideAll,
} from "./ui-functions.js";
const baseAPI = "http://localhost:1337/api/";
const header = { "Content-Type": "application/json" };

export function logoutUser() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userID");
  printPage();
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

    document.getElementById(
      "todo-header"
    ).innerText = `Todo List of ${data.user.username}`;

    let userRes = await fetch("http://localhost:1337/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    });

    let userData = await userRes.json();
    console.log(userData, "data2");
    await printPage();
    clearInput();
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

export async function setRating() {}

export async function calcRating() {}

// export async function calcRating() {}

//------Old todo stuff------
//--------Using for reference

// export async function createTodo(userId) {
//   const authToken = sessionStorage.getItem("token");
//   const userID = sessionStorage.getItem("userID");

//   const response = await axios.post(
//     "http://localhost:1337/api/todos",
//     {
//       data: {
//         title: todoTitle.value,
//         description: todoDescrip.value,
//         completed: false,
//         user: userID,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     }
//   );
//   todoTitle.value = "";
//   todoDescrip.value = "";
//   getTodosForUser(userID);
//   console.log(response.data);
//   console.log(userID);
// }

// export async function getTodosForUser(userID) {
//   const authToken = sessionStorage.getItem("token");
//   const todoList = document.getElementById("todo-items");
//   todoList.innerHTML = "";
//   const response = await axios.get(
//     `http://localhost:1337/api/users/me?populate=todos`,
//     {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     }
//   );
//   let userTodos = response.data.todos;

//   userTodos.forEach((todo) => {
//     todoList.innerHTML += `<li data-id="${todo.id}"> <b>${todo.title}</b>  ${todo.description}
//           <button class="delete-todo">Delete todo</button>
//             </li>`;
//   });

//   document.querySelectorAll(".delete-todo").forEach((btn) => {
//     btn.addEventListener("click", async (e) => {
//       const todoId = e.target.parentElement.getAttribute("data-id");
//       console.log("I want to die", todoId);
//       deleteTodo(todoId, userID, authToken);
//     });
//   });
// }

// export async function deleteTodo(todoId, userID, authToken) {
//   const response = await axios.delete(
//     `http://localhost:1337/api/todos/${todoId}?populate=todos`,
//     {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     }
//   );
//   console.log("buggy");
//   console.log(response);
//   getTodosForUser(userID);
// }
