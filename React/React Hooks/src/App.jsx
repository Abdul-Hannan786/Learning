import { useCallback, useMemo, useState } from "react";
import "./App.css";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";
import FilterButton from "./Components/FilterButton";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    { todo: "Learn React", completed: false, id: Date.now() },
  ]);
  const [filter, setFilter] = useState("All");

  const handleAddTodo = useCallback(() => {
    const todosArr = [...todos, { todo, completed: false, id: Date.now() }];
    setTodos([...todosArr]);
    setTodo("");
  }, [todos, todo]);

  const handleDeleteTodo = useCallback(
    (id) => {
      const allOtherTodos = todos.filter((todo) => todo.id !== id);
      setTodos([...allOtherTodos]);
    },
    [todos]
  );

  const handleOnToggleTodo = useCallback(
    (id) => {
      const todosArr = [...todos];
      const todoIndex = todosArr.findIndex((todo) => todo.id === id);
      todosArr[todoIndex].completed = !todosArr[todoIndex].completed;
      setTodos([...todosArr]);
      console.log(todosArr);
    },
    [todos]
  );

  const filteredTodos = useMemo(
    () =>
      todos.filter((data) => {
        if (filter === "All") return true;
        if (filter === "Complete" && data.completed) return true;
        if (filter === "Incomplete" && !data.completed) return true;
      }),
    [todos, filter]
  );

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="font-bold text-3xl">Todo App</h1>
      <TodoInput
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onClick={handleAddTodo}
      />

      <FilterButton filter={filter} setFilter={setFilter} />

      <TodoList
        todos={filteredTodos}
        onDelete={handleDeleteTodo}
        toggleTodo={handleOnToggleTodo}
      />
    </div>
  );
};

export default App;
