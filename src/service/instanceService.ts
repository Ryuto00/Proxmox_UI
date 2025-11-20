const mockInstances = [
  {
    id: "10001",
    name: "Web-Server",
    os: "Ubuntu 20.04",
    cpu: "2 cores",
    ram: "4 GB",
    storage: "60 GB",
    status: "Running",
    date: "2024-04-25",
    password: "my-secret-pass"
  },
  {
    id: "10002",
    name: "DB-Server",
    os: "Debian 11",
    cpu: "4 cores",
    ram: "8 GB",
    storage: "200 GB",
    status: "OFF",
    date: "2025-04-25",
    password: "mypassword123"
  }
];

export async function getInstanceById(id: string) {
  return mockInstances.find((i) => i.id === id);
}
