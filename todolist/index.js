document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.querySelector(".addBtn");
  const todoList = document.querySelector(".todoList");
  function addTodo() {
    const todoText = input.value.trim();
    if (todoText === "") {
      return alert("할 일을 입력하세요!");
    }

    const li = document.createElement("li");
    li.textContent = todoText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    console.log("value : ", input.value);
    input.value = "";
    input.focus();
  }

  addBtn.addEventListener("click", addTodo);

  let isComposing = false;

  input.addEventListener("compositionstart", () => {
    isComposing = true;
  });

  input.addEventListener("compositionend", () => {
    isComposing = false;
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      addTodo();
    }
  });
});
