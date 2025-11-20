// --- Mock OS Options ---
export async function getOSOptions() {
  return [
    "debian-12-standard",
    "ubuntu-20.04",
    "ubuntu-22.04",
    "centos-7",
  ];
}

// --- Mock Spec Options ---
export async function getSpecOptions() {
  return [
    { name: "t1.micro", cpu: "1 Core", ram: "2 GB", storage: "30 GB Storage" },
    { name: "t2.medium", cpu: "2 Core", ram: "4 GB", storage: "60 GB Storage" },
    { name: "t3.large", cpu: "4 Core", ram: "8 GB", storage: "100 GB Storage" },
    { name: "t3.2.xlarge", cpu: "8 Core", ram: "16 GB", storage: "200 GB Storage" },
    { name: "c4.highcpu", cpu: "16 Core", ram: "32 GB", storage: "250 GB Storage" },
    { name: "m5.4xlarge", cpu: "32 Core", ram: "64 GB", storage: "500 GB Storage" },
  ];
}

// --- Mock Existing Requests ---
const mockRequests = [
  {
    id: "100001",
    os: "debian-12-standard",
    spec: "t1.micro",
    enableGPU: false,
    startDate: "2025-01-01",
    endDate: "2025-01-20",
  },
  {
    id: "100002",
    os: "ubuntu-20.04",
    spec: "t2.medium",
    enableGPU: true,
    startDate: "2025-03-12",
    endDate: "2025-03-30",
  },
];

// --- ดึง Request ตาม ID ---
export async function getRequestById(id: string) {
  const req = mockRequests.find((r) => r.id === id);
  if (!req) throw new Error("Request not found: " + id);
  return req;
}
