import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodos,
} from "../../store/slice/todoSlice"

const TodoList = () => {
  const [currentTodo, setCurrentTodo] = useState("")
  const [currentEditedTodoId, setCurrentEditedTodoId] = useState(null)

  const dispatch = useDispatch()
  const { todoList, todoListFromApi, loading } = useSelector(
    (state) => state.todo
  )
  const handleAddTodo = () => {
    dispatch(addTodo(currentTodo))
    setCurrentTodo("")
  }
  const handleDeleteTodo = (currentTodoId) => {
    dispatch(deleteTodo(currentTodoId))
  }
  const handleUpdateTodo = (currentTodoId) => {
    // dispatch(updateTodo())
    setCurrentEditedTodoId(currentTodoId.id)
    setCurrentTodo(currentTodoId.title)
  }
  const handleEditTodo = () => {
    dispatch(
      editTodo({
        currentEditedTodoId,
        currentTodo,
      })
    )
    setCurrentTodo("")
    setCurrentEditedTodoId(null)
  }
  const fetchListOfTodosFromApi = () => {
    dispatch(fetchTodos())
  }

  console.log(todoListFromApi)

  if (loading) {
    return <h1>Fetching todos from Api !</h1>
  }

  return (
    <div>
      <input
        value={currentTodo}
        onChange={(e) => setCurrentTodo(e.target.value)}
        type="text"
        name="todo"
        placeholder="Enter your todo"
      />
      <button
        disabled={currentTodo === ""}
        onClick={currentEditedTodoId !== null ? handleEditTodo : handleAddTodo}
      >
        {currentEditedTodoId !== null ? "Edit Todo" : "Add Todo"}
      </button>
      <br />
      <ul>
        {todoList && todoList.length > 0
          ? todoList.map((todo) => (
              <div
                style={{ display: "flex", marginBottom: "10px" }}
                key={todo.id}
              >
                <li style={{ marginRight: "10px" }}>{todo.title}</li>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateTodo(todo)}>Update</button>
              </div>
            ))
          : null}
      </ul>
      <button onClick={fetchListOfTodosFromApi}>
        Fetch List of Todos From Api
      </button>
      <ul>
        {" "}
        {todoListFromApi && todoListFromApi.length > 0
          ? todoListFromApi.map((todo) => {
              return <li key={todo.id}>{todo.todo}</li>
            })
          : null}
      </ul>
    </div>
  )
}

export default TodoList
