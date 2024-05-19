import React, { useEffect, useState } from "react";
import adminService from "../../services/admin";
import { Link } from "react-router-dom";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const getReport = async () => {
    const res = await adminService.getAllReport();
    setReports(res);
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div className="p-3">
      <h1>Reports</h1>
      <table className="w-full table-auto border border-slate-500 p-3 ">
        <thead>
          <tr className=" border-b border border-spacing-4	">
            <th className="text-start p-3  ">Post Id</th>
            <th className="text-start p-3 border-b-slate-500">Posted By</th>
            <th className="text-start p-3 border-b-slate-500">
              Times reported
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => {
            const { postId, uid, timesReported } = report;

            return (
              <tr key={postId} className="border border-b hover:bg-slate-700">
                <td className="p-3 ">{postId}</td>
                <td className="p-3 "> {uid}</td>
                <td className="p-3 "> {timesReported}</td>
                <td>
                  <Link
                    to={`/viewblog/${postId}`}
                    className="border px-2 py-1 rounded bg-yellow-600"
                  >
                    View Post
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
