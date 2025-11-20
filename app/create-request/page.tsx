"use client";

import { Home, ChevronDown, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getOSOptions, getSpecOptions } from "@/src/service/createService";

export default function CreateRequestPage() {
  const router = useRouter();

  // --- Options from mock service ---
  const [osOptions, setOsOptions] = useState<string[]>([]);
  const [specOptions, setSpecOptions] = useState<any[]>([]);

  // --- User inputs ---
  const [instanceName, setInstanceName] = useState("");
  const [selectedOS, setSelectedOS] = useState("");
  const [selectedSpec, setSelectedSpec] = useState<any>(null);
  const [enableGPU, setEnableGPU] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);

  // Load options (OS, SPEC)
  useEffect(() => {
    async function loadData() {
      const os = await getOSOptions();
      const spec = await getSpecOptions();

      setOsOptions(os);
      setSpecOptions(spec);

      setSelectedOS(os[0]);
      setSelectedSpec(spec[0]);
    }

    loadData();
  }, []);

  // Save to mock localStorage
  function saveMockRequest(payload: any) {
    const saved = localStorage.getItem("mockRequests");
    const list = saved ? JSON.parse(saved) : [];

    const newReq = {
      id: String(Date.now()),   // ⭐ สำคัญ! ต้องเป็น string
      type: "Create",
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      ...payload,
    };

    const updatedList = [...list, newReq];
    localStorage.setItem("mockRequests", JSON.stringify(updatedList));
  }

  const handleCreate = async () => {
    setLoading(true);

    const payload = {
      name: instanceName,     // ⭐ ใช้ “name” ให้ตรงกับ Edit + View
      os: selectedOS,
      spec: selectedSpec,     // ⭐ เก็บ spec เป็น object ทั้งก้อน
      gpu: enableGPU,
      startDate,
      endDate,
    };

    saveMockRequest(payload);

    // delay เพื่อความเนียน
    await new Promise((resolve) => setTimeout(resolve, 300));

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f4f2ff]">

      {/* NAVBAR */}
      <div className="w-full bg-[#cfc2ff] px-8 py-4 flex items-center gap-3 shadow">
        <Home size={26} className="text-gray-700" />
        <span
          onClick={() => router.push("/dashboard")}
          className="text-xl cursor-pointer font-semibold text-gray-800"
        >
          Home
        </span>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-16 pt-12 pb-10">

        <h1 className="text-4xl font-semibold text-gray-900 mb-10">
          Create Request
        </h1>

        <div className="bg-[#e8defc] px-12 py-12 rounded-3xl shadow-xl w-full max-w-5xl mx-auto">

          {/* INSTANCE NAME */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">
            Instance Name
          </p>

          <input
            type="text"
            value={instanceName}
            onChange={(e) => setInstanceName(e.target.value)}
            placeholder="Enter instance name..."
            className="w-full bg-white text-gray-700 px-6 py-4 rounded-xl shadow-md mb-10 text-lg"
          />

          {/* OS */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">
            Operation System
          </p>

          <div className="relative mb-10">
            <select
              value={selectedOS}
              onChange={(e) => setSelectedOS(e.target.value)}
              className="w-full bg-white text-gray-700 px-6 py-4 rounded-xl shadow-md appearance-none text-lg"
            >
              {osOptions.map((os) => (
                <option key={os} value={os}>
                  {os}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-4 text-gray-500" />
          </div>

          {/* SPEC */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">Spec:</p>

          <div className="relative mb-10">
            <select
              value={selectedSpec?.name}
              onChange={(e) =>
                setSelectedSpec(specOptions.find((s) => s.name === e.target.value)!)
              }
              className="w-full bg-white text-gray-700 px-6 py-4 rounded-xl shadow-md appearance-none text-lg"
            >
              {specOptions.map((spec) => (
                <option key={spec.name} value={spec.name}>
                  {spec.name} — {spec.cpu} — {spec.ram} — {spec.storage}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-5 top-4 text-gray-500" />
          </div>

          {/* GPU */}
          <div className="flex items-center gap-3 mb-10">
            <input
              type="checkbox"
              checked={enableGPU}
              onChange={() => setEnableGPU(!enableGPU)}
              className="w-6 h-6"
            />
            <label className="text-xl text-gray-900">Enable GPU</label>
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-8 mb-12">

            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white px-6 py-4 rounded-xl shadow-md text-gray-700 text-lg"
              />
              <Calendar className="absolute right-5 top-4 text-gray-500" />
            </div>

            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white px-6 py-4 rounded-xl shadow-md text-gray-700 text-lg"
              />
              <Calendar className="absolute right-5 top-4 text-gray-500" />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button
              onClick={handleCreate}
              disabled={loading}
              className={`px-14 py-4 rounded-full text-white text-xl font-medium shadow-lg transition 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7d5fff] hover:bg-[#6d52f7]"}`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
