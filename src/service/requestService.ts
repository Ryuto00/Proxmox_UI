export async function getRequestInstances() {
  return [
    { id: "100001", type: "Update", date: "2024-04-22", status: "Pending" },
    { id: "100002", type: "Create", date: "2024-04-20", status: "Approve" },
    { id: "100003", type: "Update", date: "2024-04-18", status: "Rejected" },
    { id: "100004", type: "Create", date: "2024-04-15", status: "Pending" },
    { id: "100005", type: "Update", date: "2024-04-12", status: "Approve" },
    { id: "100006", type: "Create", date: "2024-04-10", status: "Rejected" },
  ];
}


export async function getUserInstances() {
  return [
    { name: "Web-Server",   os: "Ubuntu 20.04", cpu: "2 cores", ram: "4 GB", status: "On" },
    { name: "DB-Server",    os: "Debian 11",   cpu: "4 cores", ram: "8 GB", status: "OFF" },
    { name: "Cache-Server", os: "AlmaLinux 9", cpu: "2 cores", ram: "4 GB", status: "On" },
    { name: "Proxy-Server",    os: "Ubuntu 22.04", cpu: "2 cores", ram: "4 GB", status: "On" },
    { name: "Monitoring-Node", os: "Debian 12",   cpu: "4 cores", ram: "8 GB", status: "OFF" },
    { name: "Backup-Server",   os: "CentOS 7",    cpu: "2 cores", ram: "4 GB", status: "On" },
  ];
}
