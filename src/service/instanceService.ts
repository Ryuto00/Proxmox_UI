// ============================
// Instance Services
// ============================

// ดึง instance ทั้งหมด
export function getUserInstances() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("userInstances") || "[]");
}

// เพิ่ม instance เมื่ออนุมัติ
export function addUserInstance(req: any) {
  const list = getUserInstances();

  const newInstance = {
    id: Date.now(),
    name: req.name,
    os: req.os,
    cpu: req.spec.cpu,
    ram: req.spec.ram,
    storage: req.spec.storage,
    status: "On",
  };

  list.push(newInstance);
  localStorage.setItem("userInstances", JSON.stringify(list));
}

// อัปเดตสถานะของ instance (ON/OFF)
export function updateInstanceStatus(id: number, status: string) {
  const list = getUserInstances();

  const updated = list.map((i: any) =>
    i.id.toString() === id.toString()
      ? { ...i, status }
      : i
  );

  localStorage.setItem("userInstances", JSON.stringify(updated));
}

// ดึง instance ตาม ID
export function getInstanceById(id: string) {
  if (typeof window === "undefined") return null;

  const list = getUserInstances();
  return list.find((item: any) => item.id.toString() === id.toString()) || null;
}
