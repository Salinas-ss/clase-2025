import React from 'react'
import { getProductBySlug } from '@/lib/actions/product.actions';

export default async  function ProductDetailsPage({
    params,
}:{
    params: Promise<{slug: string}>
}) {
    const {slug} = await params;
    const product = await getProductBySlug(slug);
    //obtener informacion en la base de datos de el producto {slug}
  return (
    <div>
    <h1>Detalle del producto: {slug}</h1>
    <p>{product?.description}</p>
    </div>
    
  )
}
