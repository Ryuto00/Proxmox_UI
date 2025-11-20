"use client";

import { Home } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getInstanceById } from "@/src/service/instanceService";

export default function ViewInstancePage() {
  const params = useParams();
  const router = useRouter();

  // ดึงค่า id แบบปลอดภัย
  const instanceId: string =
    Array.isArray(params.id) ? params.id[0] : params.id || "";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const inst = await getInstanceById(instanceId);
        setData(inst);
      } catch (e) {
        console.error("Error:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [instanceId]);

  // ---------- UI Loading ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  // ---------- ถ้าไม่พบ instance ----------
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        ❌ Instance not found
      </div>
    );
  }

  // ---------- UI หลัก ----------
  return (
    <div className="min-h-screen bg-[#f4f2ff]">
      
      {/* NAVBAR */}
      <div className="w-full bg-[#cfc2ff] px-6 py-4 flex items-center gap-3 shadow">
        <Home size={26} className="text-gray-700" />
        <span
          onClick={() => router.push("/dashboard")}
          className="text-xl cursor-pointer font-semibold text-gray-800"
        >
          Home
        </span>
      </div>

      {/* CONTENT */}
      <div className="px-16 pt-12 pb-10">
        <h1 className="text-4xl font-semibold text-gray-900 mb-10">
          View Instance #{instanceId}
        </h1>

        <div className="bg-[#e8defc] px-12 py-12 rounded-3xl shadow-xl w-full max-w-5xl mx-auto">

          {/* OS */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">
            Operation System
          </p>

          <div className="w-full bg-white px-6 py-4 rounded-xl shadow-md text-lg mb-10">
            {data.os}
          </div>

          {/* SPEC TABLE */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">Spec:</p>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <table className="w-full border-collapse text-gray-700">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Instance Name</td>
                  <td>{data.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">CPU</td>
                  <td>{data.cpu}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">RAM</td>
                  <td>{data.ram}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Storage</td>
                  <td>{data.storage}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Status</td>
                  <td>{data.status}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end mt-10">
            <button className="px-10 py-3 bg-[#7d5fff] hover:bg-[#6d52f7] transition rounded-full text-white text-xl font-medium shadow-lg">
              View Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
