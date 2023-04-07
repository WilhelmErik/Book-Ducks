const baseAPI = "http://localhost:1337/api/";

export function logoutUser() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userID");
  printPage();
}

export async function register() {
  try {
    let response = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      {
        username: Usernamet.value,
        email: Mailet.value,
        password: Pwet.value,
      }
    );
    registerMessage(response.data.user.username);
    clearInput();
  } catch (error) {
    console.error(error, "o no");
  }
}

export async function login(){
  try {
    console.log(Usernamet.value, Pwet.value);
    let response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: Usernamet.value,
      password: Pwet.value,
    });

    let data = response.data;
    console.log(data.user.id, "paus");

    sessionStorage.setItem("userID", data.user.id);
    sessionStorage.setItem("token", data.jwt);

    console.log(sessionStorage.getItem("token"), "Ett token");

    document.getElementById(
      "todo-header"
    ).innerText = `Todo List of ${data.user.username}`;

    let userRes = await axios.get("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${data.jwt}`,
      },
    });
    let userData = userRes.data;
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
};

// document.getElementById("add-todo").addEventListener("click", async (e) => {
//   await createTodo();
// });

export async function createTodo(userId) {
  const authToken = sessionStorage.getItem("token");
  const userID = sessionStorage.getItem("userID");

  const response = await axios.post(
    "http://localhost:1337/api/todos",
    {
      data: {
        title: todoTitle.value,
        description: todoDescrip.value,
        completed: false,
        user: userID,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  todoTitle.value = "";
  todoDescrip.value = "";
  getTodosForUser(userID);
  console.log(response.data);
  console.log(userID);
}

export async function getTodosForUser(userID) {
  const authToken = sessionStorage.getItem("token");
  const todoList = document.getElementById("todo-items");
  todoList.innerHTML = "";
  const response = await axios.get(
    `http://localhost:1337/api/users/me?populate=todos`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  let userTodos = response.data.todos;

  userTodos.forEach((todo) => {
    todoList.innerHTML += `<li data-id="${todo.id}"> <b>${todo.title}</b>  ${todo.description} 
          <button class="delete-todo">Delete todo</button>
            </li>`;
  });

  document.querySelectorAll(".delete-todo").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const todoId = e.target.parentElement.getAttribute("data-id");
      console.log("I want to die", todoId);
      deleteTodo(todoId, userID, authToken);
    });
  });
}

export async function deleteTodo(todoId, userID, authToken) {
  const response = await axios.delete(
    `http://localhost:1337/api/todos/${todoId}?populate=todos`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  console.log("buggy");
  console.log(response);
  getTodosForUser(userID);
}
