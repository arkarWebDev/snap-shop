import DashBoardNavigation from "@/components/navigation/dashboard-nav";
import { auth } from "@/server/auth";
import {
  ChartNoAxesCombined,
  Package,
  PackagePlus,
  Settings,
  Truck,
  Upload,
} from "lucide-react";
import React from "react";

const publicRoutes = [
  {
    label: "Orders",
    path: "/dashboard/orders",
    icons: <Truck size={16} />,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icons: <Settings size={16} />,
  },
];

const privateRoutes = [
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icons: <ChartNoAxesCombined size={16} />,
  },
  {
    label: "Create Product",
    path: "/dashboard/create-product",
    icons: <PackagePlus size={16} />,
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icons: <Package size={16} />,
  },
];
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const routes =
    session?.user.role === "admin"
      ? [...privateRoutes, ...publicRoutes]
      : publicRoutes;
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DashBoardNavigation routes={routes} />
      <section className="mt-4">{children}</section>
    </div>
  );
}
