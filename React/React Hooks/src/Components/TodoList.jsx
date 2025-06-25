

const TodoList = ({ todos, onDelete, toggleTodo }) => {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="flex bg-slate-100 rounded my-2">
            <h3 style={{textDecoration: todo.completed && "line-through"}} onClick={() => toggleTodo(todo.id)} className="font-medium cursor-pointer py-2 font-mono text-3xl pl-2 flex-1 text-left">
              {todo.todo}
            </h3>
            <button onClick={() => onDelete(todo.id)} className="bg-red-200 rounded px-4 font-semibold">
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
