import { useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();

  const job = {
    title: "Backend Developer",
    company: "ABC Tech",
    location: "Bangalore",
    description: "Full job description here...",
    applyLink: "#",
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-3">{job.title}</h1>

      <p className="mb-2">
        <strong>Company:</strong> {job.company}
      </p>

      <p className="mb-4">
        <strong>Location:</strong> {job.location}
      </p>

      <p className="mb-6">{job.description}</p>

      <a
        href={job.applyLink}
        target="_blank"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Apply on Company Portal
      </a>
    </div>
  );
}

export default JobDetails;
