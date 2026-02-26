import { useEffect, useState } from "react";
import type { Todo, Category } from "./api";
import { api } from "./api";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCatId, setNewCatId] = useState<number | "">("");
  const [newCatName, setNewCatName] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [todosData, catsData] = await Promise.all([
        api.getTodos(),
        api.getCategories(),
      ]);
      setTodos(todosData);
      setCategories(catsData);
      setError("");
    } catch (e: any) {
      setError(e.message || "Failed to load data. Is the backend running?");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const created = await api.createTodo(
        newTitle,
        newCatId === "" ? undefined : newCatId
      );
      setTodos([...todos, created]);
      setNewTitle("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await api.updateTodo(todo.id, !todo.is_completed, todo.title, todo.category_id);
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const created = await api.createCategory(newCatName);
      setCategories([...categories, created]);
      setNewCatId(created.id);
      setNewCatName("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen py-10 flex justify-center items-start">
      <div className="bg-white w-full max-w-xl shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-sans border-b pb-4">
          Enterprise Task Manager
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Action Bar */}
        <div className="mb-6 space-y-4">
          {/* Create Category */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="New Category..."
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-blue-500"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
            />
            <button
              onClick={handleCreateCategory}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm transition-colors"
            >
              Add Category
            </button>
          </div>

          {/* Create Todo */}
          <form onSubmit={handleAddTodo} className="flex space-x-2">
            <select
              className="border rounded px-3 py-2 text-sm bg-gray-50 focus:outline-blue-500 max-w-[150px]"
              value={newCatId}
              onChange={(e) =>
                setNewCatId(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="">No Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="What needs to be done?"
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-blue-500"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors"
            >
              Add
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">All caught up!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 border rounded-lg transition-all"
              >
                <div className="flex items-center space-x-3 max-w-[80%]">
                  <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={() => handleToggle(todo)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span
                      className={`text-sm ${todo.is_completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                        }`}
                    >
                      {todo.title}
                    </span>
                    {todo.category && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-1 w-max">
                        {todo.category.name}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors px-2 py-1 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
