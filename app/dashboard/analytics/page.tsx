import AnalyticsCard from "@/components/analytics/analytic-card";
import { analytics } from "@/server/actions/analytics";
import { Box, Clock, Package, Users } from "lucide-react";

const Analytics = async () => {
  const analyticsData = await analytics();

  return (
    <main className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {analyticsData && (
        <>
          <AnalyticsCard
            title="Pending Orders"
            count={analyticsData.pendingOrders}
            icon={<Clock size={26} />}
            href="/dashboard/orders"
          />
          <AnalyticsCard
            title="Completed Orders"
            count={analyticsData.completedOrders}
            icon={<Package size={26} />}
            href="/dashboard/orders"
          />
          <AnalyticsCard
            title="Total Customers"
            count={analyticsData.totalUsers}
            icon={<Users size={26} />}
            href="/"
          />
          <AnalyticsCard
            title="Total Products"
            count={analyticsData.productCount}
            icon={<Box size={26} />}
            href="/dashboard/products"
          />
        </>
      )}
    </main>
  );
};

export default Analytics;
