import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    //  FIX: handle ALL status
    const statusParam = !status || status === "ALL" ? "" : status;

    fetchTasks({ query, status: statusParam, page, pageSize })
      .then((data) => {
        setTasks(data.items || []);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}
