"use client";

import { Home, ChevronDown, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getOSOptions, getSpecOptions } from "@/src/service/createService";

export default function CreateRequestPage() {
  const router = useRouter();

  const [osOptions, setOsOptions] = useState<string[]>([]);
  const [specOptions, setSpecOptions] = useState<any[]>([]);

  const [selectedOS, setSelectedOS] = useState("");
  const [selectedSpec, setSelectedSpec] = useState<any>(null);
  const [enableGPU, setEnableGPU] = useState(false);

  // ⬇️ Load data from service (future: from real DB)
  useEffect(() => {
    async function loadData() {
      const os = await getOSOptions();
      const spec = await getSpecOptions();

      setOsOptions(os);
      setSpecOptions(spec);

      setSelectedOS(os[0]);        // default
      setSelectedSpec(spec[0]);    // default
    }

    loadData();
  }, []);

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
          <p className="text-2xl font-semibold text-gray-900 mb-3">
            Spec:
          </p>

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
                className="w-full px-6 py-4 bg-white rounded-xl shadow-md text-gray-700 text-lg"
              />
              <Calendar className="absolute right-5 top-4 text-gray-500" />
            </div>

            <div className="relative">
              <input
                type="date"
                className="w-full px-6 py-4 bg-white rounded-xl shadow-md text-gray-700 text-lg"
              />
              <Calendar className="absolute right-5 top-4 text-gray-500" />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button className="px-14 py-4 bg-[#7d5fff] hover:bg-[#6d52f7] transition rounded-full text-white text-xl font-medium shadow-lg">
              Create
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
