"use client";

import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getRequestById } from "@/src/service/requestService";
import { updateRequestStatus } from "@/src/service/requestService";


export default function AdminViewRequest() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const result = await getRequestById(id as string);
      setData(result);
    }
    load();
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f4f2ff] flex items-center justify-center">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ff] text-gray-700">

      {/* NAVBAR */}
      <div className="bg-[#cfc2ff] px-6 py-4 flex items-center gap-3 shadow">
        <Home
          size={26}
          className="text-gray-700 cursor-pointer"
          onClick={() => router.push("/admin")}
        />
        <span 
          onClick={() => router.push("/admin")}
          className="text-xl font-semibold text-gray-800 cursor-pointer"
        >
          Home
        </span>
      </div>

      <div className="px-20 py-10">
        <h2 className="text-4xl font-semibold text-gray-900 mb-10">
          View Instance Request
        </h2>

        <div className="bg-[#e8defc] p-10 rounded-3xl shadow-xl max-w-5xl mx-auto">

          {/* OS */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">
            Operation System
          </p>

          <div className="bg-white px-6 py-4 rounded-xl shadow text-lg mb-10">
            {data.os}
          </div>

          {/* SPEC TABLE */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">Spec:</p>

          <div className="bg-white rounded-2xl shadow p-8">

            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-gray-600 border-b border-purple-300">
                  <th className="pb-3">Instance Name</th>
                  <th className="pb-3">Operation System</th>
                  <th className="pb-3">Spec</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-purple-200">
                  <td className="py-4">{data.name}</td>
                  <td>{data.os}</td>
                  <td>{data.spec?.cpu}</td>
                  <td>{data.endDate}</td>
                </tr>

                <tr className="border-b border-purple-200">
                  <td></td>
                  <td></td>
                  <td className="py-4">{data.spec?.ram}</td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td className="py-4">
                    {data.spec?.storage ?? "60 GB Storage"}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>

          </div>

          {/* BUTTON AREA */}
          <div className="flex justify-end gap-6 mt-10">
            <button
              onClick={() => {
                updateRequestStatus(id as string, "Rejected");
                router.push("/admin");
              }}
              className="px-10 py-3 bg-red-400 hover:bg-red-500 text-white text-lg rounded-full shadow"
            >
              Reject
            </button>

            <button className="px-10 py-3 bg-[#7d5fff] hover:bg-[#6d52f7] text-white text-lg rounded-full shadow">
              Approve
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
