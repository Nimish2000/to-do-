import ReactDOM from "react-dom/client";
import TodoList from "./screens/todoList";
import "./app.css";

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
