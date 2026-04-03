import { useState } from 'react';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import TaskTable from './components/TaskTable';
import { useTasks } from './hooks/useTasks';
import { createTask } from './api';

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const [title, setTitle] = useState('');
  const [creating, setCreating] = useState(false);

  const { tasks, total, loading, error } = useTasks(query, status, page, 10);

  const totalPages = Math.ceil(total / 10);

  // FIX: reset page on search
  const handleSearchChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  //  FIX: reset page on filter
  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  //  CREATE TASK
  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setCreating(true);

      await createTask({
        title,
        status: "OPEN",
        priority: "MEDIUM",
      });

      setTitle('');
      setPage(1);

    } catch (err) {
      console.error(err);
      alert("Error creating task");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p className="subtitle">Internal task management</p>
      </header>

      {/* ADD TASK */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          disabled={creating}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTask} disabled={creating}>
          {creating ? "Adding..." : "Add Task"}
        </button>
      </div>

      <div className="controls">
        <SearchBar value={query} onChange={handleSearchChange} />
        <StatusFilter value={status} onChange={handleStatusChange} />
      </div>

      <TaskTable tasks={tasks} loading={loading} error={error} />

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
