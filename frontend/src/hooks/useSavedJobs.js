import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import { isLoggedIn } from "../services/auth";

// Keeps the set of saved job ids in sync with the backend.
export default function useSavedJobs() {
  const [savedIds, setSavedIds] = useState(() => new Set());

  useEffect(() => {
    if (!isLoggedIn()) return;
    let cancelled = false;
    API.get("/users/saved-jobs")
      .then((res) => {
        if (!cancelled) {
          setSavedIds(new Set((res.data.savedJobs || []).map((j) => j._id)));
        }
      })
      .catch((err) => console.error("Error loading saved jobs:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleSave = useCallback(
    async (jobId) => {
      const isSaved = savedIds.has(jobId);

      // optimistic update
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (isSaved) next.delete(jobId);
        else next.add(jobId);
        return next;
      });

      try {
        if (isSaved) await API.delete(`/users/saved-jobs/${jobId}`);
        else await API.post(`/users/saved-jobs/${jobId}`);
        return true;
      } catch (err) {
        console.error("Error updating saved job:", err);
        // roll back
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (isSaved) next.add(jobId);
          else next.delete(jobId);
          return next;
        });
        return false;
      }
    },
    [savedIds],
  );

  return { savedIds, toggleSave };
}
