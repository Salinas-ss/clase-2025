import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "@/components/auth/sign-out-button";
import ProductTable from "@/components/admin/product-table";
import { getProductsTable } from "@/lib/actions/product.actions";



export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || session.user.role !== "admin") {
    return <div>NO AUTORIZADO</div>;
  }
  
  const { page = 1, pageSize = 2 } = await searchParams;
  const { data, pageInfo } = await getProductsTable({
    page: Number(page),
    pageSize: Number(pageSize),
  });

  return (
    <>
      <div>AdminPage</div>
      <ProductTable
      products={data}
      currentPage={pageInfo.currentPage}
      totalPages={pageInfo.totalPages} />
      <SignOutButton />
    </>
  );
}