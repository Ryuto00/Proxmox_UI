export async function getOSOptions() {
  // TODO: เปลี่ยนเป็น API จริงในอนาคต
  return [
    "debian-12-standard",
    "ubuntu-20.04",
    "ubuntu-22.04",
    "centos-7",
    "almalinux-9",
  ];
}

export async function getSpecOptions() {
  // TODO: เปลี่ยนเป็น API จริงภายหลัง
  return [
    { name: "t1.micro", cpu: "1 Core", ram: "2 GB", storage: "30 GB Storage" },
    { name: "t2.medium", cpu: "2 Core", ram: "4 GB", storage: "60 GB Storage" },
    { name: "t3.large", cpu: "4 Core", ram: "8 GB", storage: "100 GB Storage" },
    { name: "t3.2.xlarge", cpu: "8 Core", ram: "16 GB", storage: "200 GB Storage" },
    { name: "c4.highcpu", cpu: "16 Core", ram: "32 GB", storage: "250 GB Storage" },
    { name: "m5.4xlarge", cpu: "32 Core", ram: "64 GB", storage: "500 GB Storage" },
  ];
}
