function Userprofile() {
  return (
    <div className="Userprofile">
      <h1>User Profile</h1>
      <p>Manage your profile information here.</p>
    </div>
  );
}

export default Userprofile;

import { useParams } from "react-router-dom";

const users = {
  1: { name: "Sarah", age: 30, status: "Married" },
  2: { name: "John", age: 35, status: "Engaged" },
  3: { name: "Alice", age: 40, status: "Taken" },
};

function UserProfile() {
  const { id } = useParams();
  const user = users[id];

  if (!user) return <p>User not found</p>;

  return (
    <>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Status: {user.status}</p>
    </>
  );
}