import { useState } from "react";
import "./App.css";
import NoToDo from "./components/NoToDo";
import CheckAndRemainingComponent from "./components/CheckAndRemainingComponent";
import FilterButtonAndClearComponent from "./components/FilterButtonAndClearComponent";

function App() {
  const [toDoItem, setToDoItem] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "Go to Grocery",
      isComplete: true,
      isEditing: false,
    },
  ]);

  const [toDoInput, setToDoInput] = useState("");
  const [toDoId, setToDoId] = useState(3);
  const [filter, setFilter] = useState("all");

  function addToDO() {
    if (toDoInput.trim().length === 0) return;

    setToDoItem([
      ...toDoItem,
      {
        id: toDoId,
        title: toDoInput,
        isComplete: false,
      },
    ]);

    setToDoId((prevToDoInput) => prevToDoInput + 1);
  }

  function handleChange(event) {
    setToDoInput(event.target.value);
  }

  function deleteAToDoItem(id) {
    setToDoItem([...toDoItem].filter((todoitem) => todoitem.id !== id));
  }

  function completeToDoItem(id) {
    const completedToDo = toDoItem.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setToDoItem(completedToDo);
  }

  function editToDoTitle(id) {
    const editingToDo = toDoItem.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });

    setToDoItem(editingToDo);
  }

  function updateTodo(event, id) {
    const updatedTodos = toDoItem.map((todoitem) => {
      if (todoitem.id === id) {
        if (event.target.value.trim().length === 0) {
          todoitem.isEditing = false;
          return todoitem;
        }
        todoitem.title = event.target.value;
        todoitem.isEditing = false;
      }

      return todoitem;
    });

    setToDoItem(updatedTodos);
  }

  function cancelEdit(event, id) {
    const updatedTodos = toDoItem.map((todoitem) => {
      if (todoitem.id === id) {
        toDoItem.isEditing = false;
      }
      return todoitem;
    });

    setToDoItem(updatedTodos);
  }

  function remaining() {
    const remainingItem = toDoItem.filter((todo) => !todo.isComplete);
    return remainingItem;
  }

  function checkAllFun() {
    const checkAll = toDoItem.map((todo) => {
      todo.isComplete = true;
      return todo;
    });
    setToDoItem(checkAll);
  }

  function clearCompleted() {
    const remainingItem = toDoItem.filter((todo) => !todo.isComplete);
    setToDoItem(remainingItem);
  }

  function filterItems(filter) {
    if (filter === "all") {
      return toDoItem;
    } else if (filter === "active") {
      return toDoItem.filter((todo) => !todo.isComplete);
    } else if (filter === "completed") {
      return toDoItem.filter((todo) => todo.isComplete);
    }
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addToDO}>
          <input
            type="text"
            value={toDoInput}
            onChange={handleChange}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        {toDoItem.length > 0 ? (
          <>
            <ul className="todo-list">
              {filterItems(filter).map((todoitem, index) => (
                <li key={todoitem.id} className="todo-item-container">
                  <div className="todo-item">
                    <input
                      type="checkbox"
                      onChange={() => completeToDoItem(todoitem.id)}
                      checked={todoitem.isComplete ? true : false}
                    />
                    {todoitem.isEditing ? (
                      <input
                        type="text"
                        className="todo-item-input"
                        defaultValue={todoitem.title}
                        onBlur={(event) => updateTodo(event, todoitem.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            updateTodo(event, todoitem.id);
                          } else if (event.key === "Escape") {
                            cancelEdit(event, todoitem.id);
                          }
                        }}
                      />
                    ) : (
                      <span
                        className={`todo-item-label ${
                          todoitem.isComplete ? "line-through" : ""
                        }`}
                        autoFocus
                        onDoubleClick={() => editToDoTitle(todoitem.id)}
                      >
                        {todoitem.title}
                      </span>
                    )}
                  </div>
                  <button
                    className="x-button"
                    onClick={() => deleteAToDoItem(todoitem.id)}
                  >
                    <svg
                      className="x-button-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <CheckAndRemainingComponent
              remaining={remaining}
              checkAllFun={checkAllFun}
            />
            <FilterButtonAndClearComponent
              clearCompleted={clearCompleted}
              filterItems={filterItems}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        ) : (
          <NoToDo />
        )}
      </div>
    </div>
  );
}

export default App;
