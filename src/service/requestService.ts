// ============================
// Request Instances (Mock + LocalStorage)
// ============================

// ดึงรายการ Request
export async function getRequestInstances() {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("mockRequests");
  return saved ? JSON.parse(saved) : [];
}

// ดึง Request ตาม ID
export async function getRequestById(id: string) {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("mockRequests");
  const list = saved ? JSON.parse(saved) : [];

  return list.find((item: any) => item.id.toString() === id.toString()) || null;
}

// ============================
// User Instances (ยังคง mock เดิมไว้ได้)
// ============================

export async function getUserInstances() {
  return [
    { name: "Web-Server", os: "Ubuntu 20.04", cpu: "2 cores", ram: "4 GB", status: "On", id: 1 },
    { name: "DB-Server", os: "Debian 11", cpu: "4 cores", ram: "8 GB", status: "OFF", id: 2 },
    { name: "Cache-Server", os: "AlmaLinux 9", cpu: "2 cores", ram: "4 GB", status: "On", id: 3 },
    { name: "Proxy-Server", os: "Ubuntu 22.04", cpu: "2 cores", ram: "4 GB", status: "On", id: 4 },
    { name: "Monitoring-Node", os: "Debian 12", cpu: "4 cores", ram: "8 GB", status: "OFF", id: 5 },
    { name: "Backup-Server", os: "CentOS 7", cpu: "2 cores", ram: "4 GB", status: "On", id: 6 },
  ];
}
