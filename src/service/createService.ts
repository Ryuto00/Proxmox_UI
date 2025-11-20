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

// --- ดึง Request จาก LocalStorage ---
export async function getRequestById(id: string) {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("mockRequests");
  if (!saved) return null;

  const list = JSON.parse(saved);
  const found = list.find((item: any) => String(item.id) === String(id));

  return found || null;
}

// --- ดึง Request ทั้งหมด ---
export async function getAllRequests() {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("mockRequests");
  return saved ? JSON.parse(saved) : [];
}
