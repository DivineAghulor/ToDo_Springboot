"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Check JWT and fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchTasks(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTasks = async (token: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/auth/login");
        return;
      }
      const data = await res.json();
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !newTask.trim()) return;
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const task = await res.json();
      setTasks([task, ...tasks]);
      setNewTask("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task");
    }
  };

  const handleToggle = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setError("");
    try {
      const res = await fetch(`/api/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to update task");
      setTasks(tasks =>
        tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setError("");
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks(tasks => tasks.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center p-4 animate-fade-in">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">My To-Do List</h1>
        <form onSubmit={handleAddTask} className="flex mb-6 gap-2">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded transition disabled:opacity-50"
            disabled={loading || !newTask.trim()}
          >
            Add
          </button>
        </form>
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded transition font-semibold ${filter === "all" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded transition font-semibold ${filter === "active" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 rounded transition font-semibold ${filter === "completed" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map(task => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition bg-gray-50 hover:bg-purple-50 ${task.completed ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id)}
                    className="accent-purple-500 w-5 h-5 transition"
                  />
                  <span className={`text-lg ${task.completed ? "line-through" : ""}`}>{task.title}</span>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-xl transition"
                  title="Delete"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
