function SavedJobs() {
  const saved = [];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

      {saved.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        saved.map((job) => (
          <div key={job.id} className="border p-4 rounded mb-4">
            <h2 className="font-bold">{job.title}</h2>

            <p>{job.company}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedJobs;
