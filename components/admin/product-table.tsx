import React from "react";
import { Product } from "@/types/Product";
import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import ProductTablePagination from "./product-table-pagination";

export default function ProductTable({products, totalPages=1, currentPage=1, pageSize=1}:{
    products: Product[],
    totalPages?: number,
    currentPage?: number,
    pageSize?: number
}) {
  return <>
    <Table>
        <TableCaption>
            List of Products
        </TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map((product) => 
                <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.slug}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                        <Button variant={"outline"} className="text-destructive" asChild>
                            <Link href={`/admin/products/${product.id}`}>
                                <Pencil />
                                <Trash />    
                            </Link>
                        </Button>
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
    <ProductTablePagination currentPage={currentPage} totalPages={totalPages}/>
  </>;
}
