import { useState } from 'react';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import TaskTable from './components/TaskTable';
import { useTasks } from './hooks/useTasks';
import { createTask } from './api'; //use API layer

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  //  Create task state
  const [title, setTitle] = useState('');
  const [creating, setCreating] = useState(false); // better than using loading

  const { tasks, total, loading, error } = useTasks(query, status, page, 10);

  const totalPages = Math.ceil(total / 10);

  //  CREATE TASK FUNCTION (IMPROVED)
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
      setPage(1); //  refresh data without reload

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

      {/* ADD TASK UI (IMPROVED) */}
      <div
        className="add-task"
        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={handleAddTask} disabled={creating}>
          {creating ? "Adding..." : "Add Task"}
        </button>
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
