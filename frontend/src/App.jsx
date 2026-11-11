import { Routes, Route, Navigate } from "react-router-dom";
import Home2 from "./pages/Home2";
import Companies from "./pages/Companies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";
import Profile from "./pages/Profile";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home2 />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/jobs/:id"
        element={
          <RequireAuth>
            <JobDetails />
          </RequireAuth>
        }
      />
      <Route
        path="/saved"
        element={
          <RequireAuth>
            <SavedJobs />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
