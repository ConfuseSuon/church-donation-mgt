import {
  BookOutlined,
  DeliveredProcedureOutlined,
  FileTextOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const sidebarMenuItem = [
  {
    label: "Dashboard",
    key: "/dashboard",
    guard: "admin",
    icon: <PieChartOutlined />,
  },
  {
    label: "Donor",
    key: "/dashboard/donor",
    guard: "admin",
    icon: <TeamOutlined />,
  },
  {
    label: "Donation",
    key: "/dashboard/donation",
    guard: "admin",
    icon: <BookOutlined />,
  },

  {
    label: "Certificate",
    key: "/dashboard/certificate",
    guard: "admin",
    icon: <DeliveredProcedureOutlined />,
  },
  {
    label: "Report",
    key: "/dashboard/report",
    guard: "admin",
    icon: <FileTextOutlined />,
  },
];
