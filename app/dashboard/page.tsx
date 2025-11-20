"use client";

import { useEffect, useState } from "react";
import { Home, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { 
  getRequestInstances, 
  getUserInstances 
} from "@/src/service/requestService";

export default function DashboardPage() {
  const router = useRouter();

  const [requestData, setRequestData] = useState<any[]>([]);
  const [userInstance, setUserInstance] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const req = await getRequestInstances();
      const user = await getUserInstances();

      // ⭐ แก้ตรงนี้: เอาเฉพาะ Pending + Rejected (ไม่เอา Approved)
      const filteredReq = req.filter(
        (item: any) => item.status !== "Approved"
      );

      setRequestData(filteredReq);
      setUserInstance(user);
    }
    loadData();
  }, []);

  const badgeStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-gray-800";
      case "Approved":         // ใช้ตรงกับ updateRequestStatus(..., "Approved")
      case "Approve":          // กันกรณีเขียนผิดมาจาก backend
        return "bg-green-200 text-gray-800";
      case "Rejected":
        return "bg-red-200 text-gray-800";
      case "On":
        return "bg-green-200 text-gray-800";
      case "OFF":
        return "bg-gray-300 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ff] text-gray-700">

      {/* NAVBAR */}
      <div className="bg-[#cfc2ff] px-6 py-4 flex items-center gap-3 shadow">
        <Home size={26} className="text-gray-700" />
        <span className="text-xl font-semibold text-gray-800">Home</span>
      </div>

      <div className="p-10">

        {/* REQUEST INSTANCE */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold text-gray-800">
            Request Instance
          </h2>

          {/* กดแล้วไปหน้า create-request */}
          <button
            onClick={() => router.push("/create-request")}
            className="flex items-center gap-2 px-5 py-2 bg-[#d4c5ff] hover:bg-[#bfb0ff] transition rounded-full shadow-sm"
          >
            <Plus size={20} />
            <span className="text-gray-700 font-medium">Create</span>
          </button>
        </div>

        {/* REQUEST TABLE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-12">
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-gray-600 border-b border-purple-200">
                  <th className="pb-3">Instance ID</th>
                  <th className="pb-3">Request Type</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th></th>
                </tr>
              </thead>
              
              <tbody>
                {requestData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-gray-400"
                    >
                      No requests found.
                    </td>
                  </tr>
                ) : (
                  requestData.map((item) => (
                    <tr key={item.id} className="border-b border-purple-100">
                      <td className="py-4">{item.id}</td>
                      <td>{item.type}</td>
                      <td>{item.date}</td>
                      <td>
                        <span
                          className={`px-4 py-1 rounded-full text-sm ${badgeStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => router.push(`/edit-request/${item.id}`)}
                          className="px-4 py-1 bg-[#bdb7d3] hover:bg-[#a9a3c4] transition rounded-full text-gray-700"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* USER INSTANCE */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-5">User Instance</h2>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-gray-600 border-b border-purple-200">
                  <th className="pb-3">Instance Name</th>
                  <th className="pb-3">OS</th>
                  <th className="pb-3">CPU</th>
                  <th className="pb-3">RAM</th>
                  <th className="pb-3">Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {userInstance.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-gray-400"
                    >
                      No instances found.
                    </td>
                  </tr>
                ) : (
                  userInstance.map((item) => (
                    <tr key={item.name} className="border-b border-purple-100">
                      <td className="py-4">{item.name}</td>
                      <td>{item.os}</td>
                      <td>{item.cpu}</td>
                      <td>{item.ram}</td>
                      <td>
                        <span
                          className={`px-4 py-1 rounded-full text-sm ${badgeStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => router.push(`/view-instance/${item.id}`)}
                          className="px-4 py-1 bg-[#bdb7d3] hover:bg-[#a9a3c4] transition rounded-full text-gray-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
