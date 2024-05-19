import React, { useEffect, useState } from "react";
import adminService from "../../services/admin";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const data = [
    {
      name: "Rahim",
      email: "rahim@gmail.com",
      id: "123",
    },
    { name: "Himal", email: "himal@gmail.com", id: "234" },
    {
      name: "Fahim",
      email: "Fahim@gmail.com",
      id: "333",
    },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminService.getAllUsers().then((res) => {
      setUsers(res);
    });
  }, []);
  return (
    <div className="p-3">
      <h1 className="text-lg">Manage users</h1>

      <h2 className="text-xl font-bold">
        Total Registered Users: {users?.length}
      </h2>

      {users.map((item, index) => {
        return (
          <div
            key={item.id}
            className="border flex justify-between p-3 items-center"
          >
            <h3>{index + 1}</h3>
            <h3 className="py-2 ">{item.name}</h3>
            <h3 className="py-2 ">{item.email}</h3>

            <Link
              to={`../user/${item._id}`}
              className="bg-slate-400 rounded px-3 py-1"
            >
              View User
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ManageUsers;
