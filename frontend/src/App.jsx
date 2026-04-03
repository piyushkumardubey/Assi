import { useState } from 'react';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import TaskTable from './components/TaskTable';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  // ✅ NEW STATE (for create task)
  const [title, setTitle] = useState('');

  const { tasks, total, loading, error } = useTasks(query, status, page, 10);

  const totalPages = Math.ceil(total / 10);

  // ✅ CREATE TASK FUNCTION
  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          status: "OPEN",
          priority: "MEDIUM",
        }),
      });

      setTitle('');
      window.location.reload(); // simple refresh (acceptable for assignment)
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p className="subtitle">Internal task management</p>
      </header>

      {/* ✅ ADD TASK UI */}
      <div className="add-task" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <StatusFilter value={status} onChange={setStatus} />
      </div>

      <TaskTable tasks={tasks} loading={loading} error={error} />

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
