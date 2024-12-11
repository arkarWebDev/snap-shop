"use server";

import { between, eq } from "drizzle-orm";
import { db } from "..";
import { orders, products, users } from "../schema";
import { endOfDay, format, startOfDay, subDays } from "date-fns";

export const analytics = async () => {
  try {
    const pendingOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.status, "pending"));

    const completedOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.status, "completed"));

    const totalUsers = await db.select().from(users);

    const productCount = await db.select().from(products);

    return {
      pendingOrders: pendingOrders.length,
      completedOrders: completedOrders.length,
      totalUsers: totalUsers.length,
      productCount: productCount.length,
    };
  } catch (error) {
    console.log(error);
  }
};

export const weeklyAnalytics = async () => {
  try {
    const today = new Date();

    const days = Array.from({ length: 7 }, (_, index) => {
      return format(subDays(today, index), "yyyy-MM-dd");
    }).reverse();

    const data = await Promise.all(
      days.map(async (day) => {
        const startDay = startOfDay(new Date(day));
        const endDay = endOfDay(new Date(day));

        const orderData = await db
          .select({ count: orders.id })
          .from(orders)
          .where(between(orders.created, startDay, endDay));

        return { day, count: orderData.length };
      })
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
