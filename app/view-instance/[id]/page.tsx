"use client";

import { Home, Eye, EyeOff, Copy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getInstanceById, updateInstanceStatus } from "@/src/service/instanceService";

export default function ViewInstancePage() {
  const params = useParams();
  const router = useRouter();

  const instanceId: string =
    Array.isArray(params.id) ? params.id[0] : params.id || "";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy");

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

  const toggleStatus = () => {
    const newStatus = data.status === "On" ? "Off" : "On";
    updateInstanceStatus(Number(instanceId), newStatus);

    setData((prev: any) => ({ ...prev, status: newStatus }));
  };

  const copyUsername = async () => {
    await navigator.clipboard.writeText(data.username);
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy"), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

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
          <p className="text-2xl font-semibold text-black">Operation System</p>
          <div className="w-full bg-white px-6 py-4 rounded-xl shadow-md text-black mb-10">
            {data.os}
          </div>

          {/* SPEC TABLE */}
          <p className="text-2xl font-semibold text-black mb-3">Spec:</p>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <table className="w-full text-gray-700">
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
                  <td>
                    <button
                      onClick={toggleStatus}
                      className={`px-6 py-2 rounded-full text-white transition
                        ${data.status === "On" ? "bg-green-500" : "bg-gray-500"}
                      `}
                    >
                      {data.status === "On"
                        ? "On (Click to turn Off)"
                        : "Off (Click to turn On)"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* VIEW PASSWORD */}
          <div className="flex justify-end mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="px-10 py-3 bg-[#7d5fff] hover:bg-[#6d52f7] rounded-full text-white text-xl font-medium shadow-lg"
            >
              View Password
            </button>
          </div>
        </div>
      </div>

      {/* MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-[430px] p-8">

            <h2 className="text-3xl font-semibold text-center text-black mb-8">
              View Password
            </h2>

            {/* Instance */}
            <div className="mb-6">
              <p className="font-semibold mb-1 text-black">Instance</p>
              <div className="bg-gray-100 px-4 py-3 text-black rounded-xl">
                {data.name}
              </div>
            </div>

            {/* Username */}
            <div className="mb-6">
              <p className="font-semibold text-black mb-1">Username</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 px-4 py-3 rounded-xl text-black">
                  {data.username}
                </div>
                <button
                  onClick={copyUsername}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#7d5fff] hover:bg-[#6d52f7] transition text-white"
                >
                  <Copy size={16} />
                  {copyLabel}
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="mb-8">
              <p className="font-semibold mb-1 text-black">Password</p>
              <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl">
                <span className="flex-1 text-black">
                  {showPassword ? data.password : "••••••••"}
                </span>

                <button
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-black" />
                  ) : (
                    <Eye size={20} className="text-black" />
                  )}
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-[#7d5fff] hover:bg-[#6d52f7] text-white rounded-full text-lg font-medium"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
