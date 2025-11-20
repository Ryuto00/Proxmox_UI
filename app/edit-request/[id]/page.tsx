"use client";

import { useEffect, useState } from "react";
import { Home, ChevronDown, Calendar } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import {
  getOSOptions,
  getSpecOptions,
  getRequestById,
} from "@/src/service/createService";

export default function EditRequestPage() {
  const router = useRouter();
  const params = useParams();

  const requestId: string = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string);

  const [osOptions, setOsOptions] = useState<string[]>([]);
  const [specOptions, setSpecOptions] = useState<any[]>([]);

  const [instanceName, setInstanceName] = useState("");
  const [selectedOS, setSelectedOS] = useState("");
  const [selectedSpec, setSelectedSpec] = useState<any | null>(null);

  const [enableGPU, setEnableGPU] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const os = await getOSOptions();
        const specs = await getSpecOptions();
        const req = await getRequestById(requestId);

        setOsOptions(os);
        setSpecOptions(specs);

        // Autofill
        setInstanceName(req.name || "");
        setSelectedOS(req.os);

        // รองรับทั้ง object และ string
        const matchedSpec =
          specs.find((s) => s.name === req.spec?.name) ||
          specs.find((s) => s.name === req.spec) ||
          null;

        setSelectedSpec(matchedSpec);

        setEnableGPU(req.gpu);
        setStartDate(req.startDate);
        setEndDate(req.endDate);
      } catch (err) {
        console.error("Error loading edit data:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [requestId]);

  if (loading) return <div className="p-10 text-xl">Loading...</div>;

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

      <div className="px-16 pt-12 pb-10">

        <h1 className="text-4xl font-semibold text-gray-900 mb-10">
          Edit Request #{requestId}
        </h1>

        <div className="bg-[#e8defc] px-12 py-12 rounded-3xl shadow-xl w-full max-w-5xl mx-auto">

          {/* INSTANCE NAME */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">Instance Name</p>
          <input
            type="text"
            value={instanceName}
            onChange={(e) => setInstanceName(e.target.value)}
            placeholder="Enter instance name..."
            className="w-full bg-white text-gray-700 px-6 py-4 rounded-xl shadow-md mb-10 text-lg"
          />

          {/* OS */}
          <p className="text-2xl font-semibold text-gray-900 mb-3">Operation System</p>
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

          {/* DATE */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-6 py-4 bg-white rounded-xl shadow-md text-gray-700 text-lg"
              />
              <Calendar className="absolute right-5 top-4 text-gray-500" />
            </div>

            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-6 py-4 bg-white rounded-xl shadow-md text-gray-700 text-lg"
              />
              <Calendar className="absolute right-5 top-4 text-gray-500" />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-14 py-4 bg-[#7d5fff] hover:bg-[#6d52f7] transition rounded-full text-white text-xl font-medium shadow-lg"
            >
              Save Edit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
