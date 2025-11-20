"use client";

import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getRequestInstances } from "@/src/service/requestService";

export default function AdminRequestList() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getRequestInstances();
      setRequests(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f2ff] text-gray-700">

      {/* NAVBAR */}
      <div className="bg-[#cfc2ff] px-6 py-4 flex items-center gap-3 shadow">
        <Home size={26} className="text-gray-700" />
        <span className="text-xl font-semibold text-gray-800">
          Admin Dashboard
        </span>
      </div>

      <div className="p-10">

        {/* TITLE */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Request List
        </h2>

        {/* TABLE BOX */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="max-h-96 overflow-y-auto custom-scrollbar">

            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-gray-600 border-b border-purple-200">
                  <th className="pb-3">Instance Name</th>
                  <th className="pb-3">OS</th>
                  <th className="pb-3">CPU</th>
                  <th className="pb-3">RAM</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-gray-400"
                    >
                      No requests found.
                    </td>
                  </tr>
                ) : (
                  requests.map((item) => (
                    <tr key={item.id} className="border-b border-purple-100">
                      <td className="py-4">{item.spec?.name || "Unknown"}</td>
                      <td>{item.os}</td>
                      <td>{item.spec?.cpu}</td>
                      <td>{item.spec?.ram}</td>
                      <td>
                            <button
                            onClick={() => router.push(`/admin/${item.id}`)}
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
