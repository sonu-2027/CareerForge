import { useState } from "react";

function Profile() {
  const [user] = useState({
    name: "User Name",
    email: "user@email.com",
  });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="border p-6 rounded w-96">
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>

        <p className="mb-4">
          <strong>Email:</strong> {user.email}
        </p>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
