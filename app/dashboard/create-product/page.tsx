import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";
import CreateProductForm from "./create-product-form";

const CreateProduct = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");
  return <CreateProductForm />;
};

export default CreateProduct;
